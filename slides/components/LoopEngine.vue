<script setup lang="ts">
// The high-level eval loop: Start → Context (HOW + WHAT) → AI → Evals → (back to Context | End).
// The Context box is "one big prompt", split: HOW = instructions we ENGINEER, WHAT = task we SOURCE.
// Fixed geometry + fixed node widths so HTML nodes and SVG arrows share coordinates and arrows hit edges.
// Reveal order: Start → Context → AI → Evals → loop-back → End (End is last).
const props = defineProps<{ reveal?: boolean }>()
const c = (n: number) => (props.reveal ? n : undefined)
const W = 900, H = 300, Y = 150
</script>

<template>
  <div class="loop" :style="{ width: W + 'px', height: H + 'px' }">
    <svg :viewBox="`0 0 ${W} ${H}`" class="wires">
      <defs>
        <marker id="le-ah" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#ffffff88" />
        </marker>
      </defs>
      <!-- forward arrows: x2 = target's left edge − 3 (marker tip lands on the edge) -->
      <line v-click="c(2)" x1="102" :y1="Y" x2="177" :y2="Y" stroke="#ffffff66" stroke-width="2" marker-end="url(#le-ah)" />
      <line v-click="c(3)" x1="362" :y1="Y" x2="432" :y2="Y" stroke="#ffffff66" stroke-width="2" marker-end="url(#le-ah)" />
      <line v-click="c(4)" x1="547" :y1="Y" x2="607" :y2="Y" stroke="#ffffff66" stroke-width="2" marker-end="url(#le-ah)" />
      <line v-click="c(6)" x1="732" :y1="Y" x2="797" :y2="Y" stroke="#ffffff66" stroke-width="2" marker-end="url(#le-ah)" />
      <!-- feedback: Evals (bottom) → back up into Context (bottom) -->
      <path v-click="c(5)" d="M670 174 L670 255 L270 255 L270 220" fill="none" stroke="#f59e0baa"
            stroke-width="2" stroke-dasharray="5 6" marker-end="url(#le-ah)" />
    </svg>

    <div class="node pill" v-click="c(1)" :style="{ left: '60px', top: Y + 'px' }">Start</div>

    <div class="node ctx" v-click="c(2)" :style="{ left: '270px', top: Y + 'px' }">
      <div class="ctx-cap">the prompt · context</div>
      <div class="how">HOW · instructions <span class="own">you engineer</span></div>
      <div class="what">WHAT · task <span class="own">you source</span></div>
    </div>

    <div class="node ai" v-click="c(3)" :style="{ left: '490px', top: Y + 'px' }">🤖 AI</div>
    <div class="node evals" v-click="c(4)" :style="{ left: '670px', top: Y + 'px' }">Evals</div>
    <div class="node pill done" v-click="c(6)" :style="{ left: '840px', top: Y + 'px' }">End</div>

    <div class="lbl back" v-click="c(5)" :style="{ left: '460px', top: '246px' }">not good enough ↺</div>
  </div>
</template>

<style scoped>
.loop { position: relative; margin: 0 auto; }
.wires { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.node { position: absolute; transform: translate(-50%, -50%); color: #fff; text-align: center;
  border: 1px solid #ffffff22; box-shadow: 0 10px 28px #00000055; }
.pill { width: 80px; padding: .5rem 0; border-radius: 999px; font-weight: 700; font-size: .9rem;
  background: linear-gradient(160deg, #64748b, #334155); }
.pill.done { background: linear-gradient(160deg, #22c55e, #15803d); }
.ai { width: 110px; padding: .85rem 0; border-radius: 14px; font-weight: 700;
  background: linear-gradient(160deg, #ef4444, #991b1b); }
.evals { width: 120px; padding: .85rem 0; border-radius: 14px; font-weight: 700;
  background: linear-gradient(160deg, #f59e0b, #b45309); }
.ctx { width: 180px; border-radius: 14px; overflow: hidden; background: #1e293b; }
.ctx-cap { font-size: .6rem; opacity: .6; padding: .3rem; text-transform: uppercase; letter-spacing: .06em; }
.how, .what { font-size: .74rem; font-weight: 700; padding: .5rem .4rem; display: flex;
  flex-direction: column; gap: .1rem; }
.how { background: linear-gradient(160deg, #8b5cf6, #5b21b6); }
.what { background: linear-gradient(160deg, #64748b, #334155); }
.own { font-size: .56rem; font-weight: 500; opacity: .8; }
.lbl { position: absolute; transform: translate(-50%, -50%); font-size: .72rem; white-space: nowrap; }
.lbl.back { color: #fcd34d; font-weight: 600; }
</style>
