<script setup lang="ts">
// A 2-axis evolution / quadrant plot. Items are placed by x/y in 0..100 (x: left→right, y: bottom→top).
// Data-driven so axes and positions are one-line tweaks.
//   <Plot reveal xLeft="assists you" xRight="runs without you" yBottom="ad-hoc" yTop="deterministic"
//     :items="[{ title:'Autocomplete', sub:'finishes your line', x:14, y:55, tone:'slate' }, ...]" />
interface Item { title?: string; sub?: string; x: number; y: number; tone?: string }
const props = defineProps<{
  items: Item[]
  xLeft?: string; xRight?: string; yBottom?: string; yTop?: string
  reveal?: boolean
}>()
// plot geometry (viewBox coords === container px); L/B/T/R bound the drawable area inside the axes
const W = 680, H = 470, L = 96, B = 410, T = 28, R = 664
const sx = (x: number) => L + (x / 100) * (R - L)
const sy = (y: number) => B - (y / 100) * (B - T)
const TONES: Record<string, string> = {
  slate: '#475569', sky: '#1b5e88', violet: '#5b21b6', emerald: '#15803d', amber: '#b45309', rose: '#9f1239',
}
const clk = (i: number) => (props.reveal ? i + 1 : undefined)
</script>

<template>
  <div class="plot">
    <svg :viewBox="`0 0 ${W} ${H}`" class="axes">
      <defs>
        <marker id="plot-ah" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#ffffff66" />
        </marker>
      </defs>
      <line :x1="L" :y1="B" :x2="R + 8" :y2="B" stroke="#ffffff44" stroke-width="2" marker-end="url(#plot-ah)" />
      <line :x1="L" :y1="B" :x2="L" :y2="T - 8" stroke="#ffffff44" stroke-width="2" marker-end="url(#plot-ah)" />
    </svg>

    <div class="ax" :style="{ left: L + 'px', top: B + 12 + 'px' }">{{ props.xLeft }}</div>
    <div class="ax r" :style="{ left: R + 'px', top: B + 12 + 'px' }">{{ props.xRight }}</div>
    <div class="ax yl" :style="{ left: L - 10 + 'px', top: B + 'px' }">{{ props.yBottom }}</div>
    <div class="ax yl" :style="{ left: L - 10 + 'px', top: T + 'px' }">{{ props.yTop }}</div>

    <div v-for="(it, i) in props.items" :key="i" v-click="clk(i)"
         class="node" :style="{ left: sx(it.x) + 'px', top: sy(it.y) + 'px', background: `linear-gradient(160deg, ${TONES[it.tone ?? 'slate']}, #0f172a)` }">
      <span class="t">{{ it.title }}</span>
      <span v-if="it.sub" class="s">{{ it.sub }}</span>
    </div>
  </div>
</template>

<style scoped>
.plot { position: relative; width: 680px; height: 470px; margin: 0 auto; }
.axes { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.ax { position: absolute; font-size: .72rem; opacity: .6; white-space: nowrap; }
.ax.r { transform: translateX(-100%); }
.ax.yl { transform: translate(-100%, -50%); text-align: right; width: 80px; line-height: 1.1; }
.node {
  position: absolute; transform: translate(-50%, -50%);
  border: 1px solid #ffffff22; border-radius: 10px; padding: .4rem .6rem; color: #fff;
  box-shadow: 0 8px 24px #00000055; text-align: center; width: 150px;
}
.node .t { font-size: .8rem; font-weight: 700; display: block; }
.node .s { font-size: .6rem; opacity: .82; }
</style>
