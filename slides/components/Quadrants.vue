<script setup lang="ts">
// A 2×2 matrix with crosshair axes through the CENTER (a plus, not an L-plot).
// Vertical axis end-labels = top/bottom, horizontal = left/right; one card per quadrant.
// Optional spotlight on one quadrant + click reveal (tl → tr → bl → br).
//
//   <Quadrants top="deterministic" bottom="non-deterministic" left="programmatic" right="LM-based"
//     :tl="{ tag:'…', items:['…','…'], note:'…', tone:'emerald' }" … highlight="tl" reveal />
interface Quad { tag?: string; items?: string[]; note?: string; tone?: string }
const props = defineProps<{
  top?: string; bottom?: string; left?: string; right?: string
  tl?: Quad; tr?: Quad; bl?: Quad; br?: Quad
  highlight?: 'tl' | 'tr' | 'bl' | 'br'
  reveal?: boolean
  order?: ('tl' | 'tr' | 'bl' | 'br')[]
}>()

// geometry: viewBox px === container px so SVG axes & HTML cards share coordinates
const W = 720, H = 452, CX = 360, CY = 226
const TIP = { up: [CX, 26], down: [CX, H - 26], left: [40, CY], right: [W - 40, CY] } as const
// quadrant card centers (kept clear of the crosshair gutter)
const POS: Record<string, [number, number]> = {
  tl: [188, 128], tr: [532, 128], bl: [188, 328], br: [532, 328],
}
const TONES: Record<string, string> = {
  emerald: '#22c55e', sky: '#3d9ad9', amber: '#f59e0b', rose: '#f43f5e', slate: '#64748b',
  orange: '#f97316', yellow: '#eab308',
}
// reveal: cards appear one per click. Default order tl→tr→bl→br; override with :order (e.g. a
// counter-clockwise br→tr→tl→bl). `false` (not undefined) = always visible when static.
const ORDER = props.order ?? ['tl', 'tr', 'bl', 'br']
const clk = (k: string) => (props.reveal ? ORDER.indexOf(k) + 1 : false)
// axis labels split on '·' → each part on its own line (e.g. "code · objective" → code / objective)
const parts = (s?: string) => (s ?? '').split('·').map(x => x.trim()).filter(Boolean)
const QUADS = (['tl', 'tr', 'bl', 'br'] as const).map(k => ({ k, q: props[k], pos: POS[k] }))
</script>

<template>
  <div class="quad" :style="{ width: W + 'px', height: H + 'px' }">
    <svg :viewBox="`0 0 ${W} ${H}`" class="axes">
      <line :x1="CX" :y1="TIP.up[1]" :x2="CX" :y2="TIP.down[1]" class="axis" />
      <line :x1="TIP.left[0]" :y1="CY" :x2="TIP.right[0]" :y2="CY" class="axis" />
    </svg>

    <!-- axis end-labels (left/right stack onto two lines) -->
    <div class="ax edge-top" :style="{ left: CX + 'px', top: '4px' }">
      <span v-for="(p, i) in parts(props.top)" :key="i">{{ p }}</span>
    </div>
    <div class="ax edge-bot" :style="{ left: CX + 'px', top: H - 18 + 'px' }">
      <span v-for="(p, i) in parts(props.bottom)" :key="i">{{ p }}</span>
    </div>
    <div class="ax edge-left" :style="{ left: '8px', top: CY + 'px' }">
      <span v-for="(p, i) in parts(props.left)" :key="i">{{ p }}</span>
    </div>
    <div class="ax edge-right" :style="{ left: W - 8 + 'px', top: CY + 'px' }">
      <span v-for="(p, i) in parts(props.right)" :key="i">{{ p }}</span>
    </div>

    <!-- quadrant cards -->
    <div v-for="{ k, q, pos } in QUADS" :key="k" v-click="clk(k)"
         class="card" :class="{ hi: props.highlight === k, dim: props.highlight && props.highlight !== k }"
         :style="{ left: pos[0] + 'px', top: pos[1] + 'px',
                   '--tone': TONES[q?.tone ?? 'slate'] }">
      <div class="tag">{{ q?.tag }}</div>
      <div v-if="q?.items?.length" class="eg">{{ q.items.join(' · ') }}</div>
      <div v-if="q?.note" class="note">{{ q.note }}</div>
    </div>
  </div>
</template>

<style scoped>
.quad { position: relative; margin: 0 auto; }
.axes { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.axis { stroke: #ffffff55; stroke-width: 2; }

.ax {
  position: absolute; font-size: .72rem; font-weight: 700; letter-spacing: .04em;
  text-transform: uppercase; opacity: .65; white-space: nowrap; line-height: 1.15;
}
.ax span { display: block; }
.ax span:not(:first-child) { font-size: .6rem; font-weight: 600; opacity: .8; }
.edge-top, .edge-bot { transform: translateX(-50%); text-align: center; }
.edge-left { transform: translateY(-50%); text-align: left; }
.edge-right { transform: translate(-100%, -50%); text-align: right; }

.card {
  position: absolute; transform: translate(-50%, -50%); width: 208px;
  border-radius: 14px; padding: .9rem .7rem; text-align: center;
  background: #1e293b; border: 1px solid #ffffff1f; border-top: 3px solid var(--tone);
  box-shadow: 0 10px 28px #00000055; transition: opacity .3s;
}
.card.hi { box-shadow: 0 0 0 2px color-mix(in srgb, var(--tone) 50%, transparent), 0 14px 32px #00000066; }
.card.dim { opacity: .85; }
.tag { font-weight: 800; font-size: 1.08rem; color: var(--tone); letter-spacing: .01em; }
.eg { margin-top: .4rem; font-size: .78rem; opacity: .82; }
.eg-lbl {
  font-size: .56rem; text-transform: uppercase; letter-spacing: .08em;
  opacity: .5; margin-right: .35rem;
}
.note {
  margin-top: .5rem; font-size: .6rem; font-weight: 700; color: #fcd34d;
  text-transform: uppercase; letter-spacing: .05em;
}
</style>
