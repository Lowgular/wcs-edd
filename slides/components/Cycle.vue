<script setup lang="ts">
// The Eval-Driven Development cycle — the red/green/refactor ring devs already know, relabeled.
// Three phase nodes on a ring (top / bottom-right / bottom-left), clockwise solid arrows, each arc
// carrying a transition word. No center hub — the ring stands open.
//
//   <Cycle reveal
//     :phases="[
//       { tone:'red',   tag:'🔴 RED',   title:'Define evals',       sub:'extend the eval set · test-first' },
//       { tone:'green', tag:'🟢 GREEN', title:'Improve the system', sub:'until the score clears the bar' },
//       { tone:'blue',  tag:'🔵 BLUE',  title:'Refactor',           sub:'relocate to its home', optional:true, note:'rare · at scale' },
//     ]"
//     caption="New spec? System instructions first (green). Relocate only when the system says so (blue). Re-run evals." />
//
// Exactly three phases (fixed positions: 0=top, 1=bottom-right, 2=bottom-left). The arc LEAVING
// phase i carries edge[i]: red→green 'score', green→blue 'keep', blue→red 'expand'.
interface Phase { tone?: 'red' | 'green' | 'blue'; tag?: string; title?: string; sub?: string; note?: string; optional?: boolean }
const props = defineProps<{
  phases: Phase[]
  edges?: string[]   // transition words on each arc, in cycle order
  caption?: string
  reveal?: boolean   // build up node-by-node on click
  focus?: 'red' | 'green' | 'blue'  // spotlight one phase, dim the rest (callback view)
}>()

// ── ring geometry (viewBox === container px, so HTML nodes & SVG share coordinates) ──
const CX = 320, CY = 250, R = 180
const HW = 86, HH = 34 // half node-box w/h — arcs are clipped to the box edge, not the ring point
const rad = (d: number) => (d * Math.PI) / 180
const pt = (d: number): [number, number] => [CX + R * Math.sin(rad(d)), CY - R * Math.cos(rad(d))]
const arcPath = (a: number, b: number) => { const [sx, sy] = pt(a), [ex, ey] = pt(b); return `M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}` }
const headTf = (d: number) => { const [x, y] = pt(d); return `translate(${x} ${y}) rotate(${d})` }
const inBox = (x: number, y: number, cx: number, cy: number) => Math.abs(x - cx) <= HW && Math.abs(y - cy) <= HH
// march along the ring from a node's center angle until the point leaves that node's box → edge angle
const edgeDeg = (cx: number, cy: number, start: number, step: number) => {
  let t = start
  for (let k = 0; k < 120; k++) { const [x, y] = pt(t); if (!inBox(x, y, cx, cy)) return t; t += step }
  return t
}

const EDGES = props.edges ?? ['score', 'keep', 'expand']
const NODE_DEG = [0, 120, 240]
const NODES = NODE_DEG.map(pt)                 // node centers
// each arc leaves node `src` (exit edge) and arrives at the next node (entry edge); red's
// arrival angle is 360 so the closing arc sweeps the long way round, not back through the top.
const SEG = [
  { src: 0, dst: 1, dstDeg: 120 },  // red → green
  { src: 1, dst: 2, dstDeg: 240 },  // green → blue
  { src: 2, dst: 0, dstDeg: 360 },  // blue → red
]
const ARCS = SEG.map((s) => {
  const start = edgeDeg(NODES[s.src][0], NODES[s.src][1], NODE_DEG[s.src], +1)
  const end = edgeDeg(NODES[s.dst][0], NODES[s.dst][1], s.dstDeg, -1)
  return { d: arcPath(start, end), head: headTf(end), src: s.src, lbl: pt((NODE_DEG[s.src] + s.dstDeg) / 2) }
})
const HEAD = '-7,-8 9,0 -7,8' // small arrow polygon, points +x before rotation

// reveal: strict alternation — square, edge, square, edge, … node i @ 2i+1, arc leaving i @ 2i+2.
// NB: return `false` (not undefined) when static — Slidev reads a null/undefined v-click as "+1 click",
// so undefined would make every element claim its own click. `false` = always visible, no click step.
const nodeClk = (i: number) => (props.reveal ? 2 * i + 1 : false)
const arcClk = (i: number) => (props.reveal ? 2 * i + 2 : false)
const stroke: Record<string, string> = { red: '#ef4444', green: '#22c55e', blue: '#3d9ad9' }
</script>

<template>
  <div class="cycle">
    <svg viewBox="0 0 640 470" class="ring">
      <circle :cx="CX" :cy="CY" :r="R" class="track" />
      <g v-for="a in ARCS" :key="a.src" v-click="arcClk(a.src)" :class="{ dimmed: !!props.focus }">
        <path :d="a.d" :stroke="stroke[props.phases[a.src]?.tone ?? 'red']" class="arc" fill="none" />
        <polygon :points="HEAD" :transform="a.head" :fill="stroke[props.phases[a.src]?.tone ?? 'red']" />
      </g>
    </svg>

    <!-- transition words on the arcs -->
    <div v-for="a in ARCS" :key="'l' + a.src" v-click="arcClk(a.src)"
         class="elabel" :class="{ dimmed: !!props.focus }" :style="{ left: a.lbl[0] + 'px', top: a.lbl[1] + 'px' }">
      {{ EDGES[a.src] }}
    </div>

    <!-- phase nodes -->
    <div v-for="(p, i) in props.phases" :key="i" v-click="nodeClk(i)"
         class="node" :class="[`tone-${p.tone ?? 'red'}`, { optional: p.optional,
           dimmed: props.focus && p.tone !== props.focus,
           focused: props.focus && p.tone === props.focus }]"
         :style="{ left: NODES[i][0] + 'px', top: NODES[i][1] + 'px' }">
      <span v-if="p.note" class="note">{{ p.note }}</span>
      <span v-if="p.tag" class="tag">{{ p.tag }}</span>
      <span v-if="p.title" class="title">{{ p.title }}</span>
      <span v-if="p.sub" class="sub">{{ p.sub }}</span>
    </div>

    <div v-if="props.caption" class="caption" v-click="props.reveal ? 2 * props.phases.length + 1 : false">
      {{ props.caption }}
    </div>
  </div>
</template>

<style scoped>
.cycle { position: relative; width: 640px; height: 470px; margin: 0 auto; }
.ring { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.track { fill: none; stroke: #ffffff14; stroke-width: 2; }
.arc { stroke-width: 3.5; stroke-linecap: round; }

.elabel {
  position: absolute; transform: translate(-50%, -50%);
  background: #1e1e1e; color: #fff; font-size: .74rem; font-weight: 600;
  padding: .12rem .55rem; border-radius: 999px; border: 1px solid #ffffff22;
  letter-spacing: .02em;
}

.node {
  position: absolute; transform: translate(-50%, -50%); width: 168px;
  border-radius: 14px; padding: .7rem .6rem; color: #fff; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: .12rem;
  border: 1px solid #ffffff22; box-shadow: 0 12px 34px #00000055;
}
.node.optional { border: 2px dotted #ffffffcc; }
.node .tag { font-size: .72rem; font-weight: 800; letter-spacing: .03em; opacity: .95; }
.node .title { font-weight: 700; font-size: .98rem; }
.node .sub { font-size: .66rem; opacity: .9; line-height: 1.2; }
.node .note {
  position: absolute; top: -10px; right: -8px; background: #0f172a; color: #fcd34d;
  font-size: .58rem; font-weight: 700; padding: .1rem .4rem; border-radius: 999px;
  border: 1px solid #fcd34d55; white-space: nowrap;
}
.tone-red   { background: linear-gradient(160deg, #ef4444, #991b1b); }
.tone-green { background: linear-gradient(160deg, #22c55e, #15803d); }
.tone-blue  { background: linear-gradient(160deg, #3d9ad9, #1b5e88); }

/* focus mode: spotlight one phase, fade the rest */
.node.dimmed { opacity: .25; filter: grayscale(.7); box-shadow: none; transition: opacity .3s; }
.node.focused { box-shadow: 0 0 0 3px #ef444455, 0 0 34px #ef4444aa, 0 12px 34px #00000055; }
.ring g.dimmed { opacity: .14; }
.elabel.dimmed { opacity: .2; }

.caption {
  position: absolute; left: 50%; bottom: -54px; transform: translateX(-50%);
  width: 600px; text-align: center; font-size: .76rem; opacity: .82; line-height: 1.4;
}
</style>
