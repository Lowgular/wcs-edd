<script setup lang="ts">
// Andrew — the recurring persona. ONE illustration (public/andrew-all.png) is a 4×4 sprite sheet of
// 16 expressions; this component crops to the right cell by `emotion`, so every slide shows the same
// guy in a different mood with zero extra image weight. Row-major, matching the generated sheet:
//   row0: neutral worried excited confused   row1: curious unimpressed overwhelmed warming-up
//   row2: pushing sold maintainer puzzled    row3: amazed shocked in-love goodbye
//
//   <Andrew emotion="worried" />            // 160px default
//   <Andrew emotion="neutral" :size="192" />// the larger 'Meet Andrew' portrait
//
// The sheet has ~6px WHITE GUTTERS between cells (measured: x/y 252–257, 509–514, 766–771 in the
// 1024² image). A naïve 4×4 even crop catches those white lines, so we crop each cell's exact
// content rectangle (below) instead, with a small inset to hide gutter anti-aliasing.
const props = defineProps<{
  emotion: string
  size?: number
}>()

const SRC = 1024 // sheet is 1024×1024
const INSET = 3 // px trimmed off every edge to kill residual white fringe
// content [start, end] (inclusive) for each of the 4 columns / rows, gutters excluded
const COL: [number, number][] = [[0, 251], [258, 508], [515, 765], [772, 1023]]
const ROW: [number, number][] = [[0, 251], [258, 508], [515, 765], [772, 1023]]
const GRID: Record<string, [number, number]> = {
  neutral: [0, 0], worried: [1, 0], excited: [2, 0], confused: [3, 0],
  curious: [0, 1], unimpressed: [1, 1], overwhelmed: [2, 1], 'warming-up': [3, 1],
  pushing: [0, 2], sold: [1, 2], maintainer: [2, 2], puzzled: [3, 2],
  amazed: [0, 3], shocked: [1, 3], 'in-love': [2, 3], goodbye: [3, 3],
}

const D = () => props.size ?? 160

// crop the cell's content rect into a D×D box (px math so it works at any size)
const cell = () => {
  const [c, r] = GRID[props.emotion] ?? [0, 0]
  const x0 = COL[c][0] + INSET
  const y0 = ROW[r][0] + INSET
  const sw = COL[c][1] - INSET - x0 + 1
  const sh = ROW[r][1] - INSET - y0 + 1
  const sx = D() / sw
  const sy = D() / sh
  return {
    backgroundSize: `${SRC * sx}px ${SRC * sy}px`,
    backgroundPosition: `${-x0 * sx}px ${-y0 * sy}px`,
  }
}
</script>

<template>
  <div
    class="andrew-face"
    :style="{ width: D() + 'px', height: D() + 'px', ...cell() }"
    role="img"
    :aria-label="`Andrew — ${props.emotion}`"
  />
</template>

<style scoped>
.andrew-face {
  border-radius: 1rem;
  background-image: url(/andrew-all.png);
  background-repeat: no-repeat;
  box-shadow: 0 14px 44px #00000055;
  flex-shrink: 0;
}
</style>
