<script setup lang="ts">
// A vertical stack of wide rounded bars with downward arrows — a layered
// architecture / data-flow diagram. Same rounding as <Box>, no icon, centered text.
//
//   <Layers reveal :items="[
//     { title: 'Infrastructure', tone: 'blue' },
//     { title: 'Application',    tone: 'red' },
//     { title: 'Presentation',   tone: 'green' },
//   ]" />
interface Layer {
  title?: string
  sub?: string
  tone?: 'blue' | 'red' | 'green' | 'slate' | 'amber' | 'violet' | 'cyan' | 'indigo'
}
const props = defineProps<{
  items: Layer[]
  reveal?: boolean   // reveal top → bottom on click
  arrow?: string     // glyph between layers, default "↓"
  w?: string         // bar width, default "460px"
}>()
const glyph = () => props.arrow ?? '↓'
</script>

<template>
  <div class="layers" :style="{ '--w': props.w ?? '460px' }">
    <template v-if="props.reveal">
      <template v-for="(it, i) in props.items" :key="i">
        <div v-if="i > 0" class="lyr-arr" v-click="i + 1">{{ glyph() }}</div>
        <div class="lyr" :class="`tone-${it.tone ?? 'slate'}`" v-click="i + 1">
          <div class="lyr-t">{{ it.title }}</div>
          <div v-if="it.sub" class="lyr-s">{{ it.sub }}</div>
        </div>
      </template>
    </template>
    <template v-else>
      <template v-for="(it, i) in props.items" :key="i">
        <div v-if="i > 0" class="lyr-arr">{{ glyph() }}</div>
        <div class="lyr" :class="`tone-${it.tone ?? 'slate'}`">
          <div class="lyr-t">{{ it.title }}</div>
          <div v-if="it.sub" class="lyr-s">{{ it.sub }}</div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.layers { display: flex; flex-direction: column; align-items: center; }
.lyr {
  width: var(--w); border-radius: 14px; padding: 1.1rem 1.25rem;
  display: flex; flex-direction: column; align-items: center; gap: .2rem;
  color: #fff; border: 1px solid #ffffff22; box-shadow: 0 12px 34px #00000055;
}
.lyr-t { font-weight: 700; font-size: 1.1rem; text-align: center; }
.lyr-s { font-size: .72rem; opacity: .85; text-align: center; }
.lyr-arr { font-size: 1.7rem; color: #ffffff66; line-height: 1; padding: .35rem 0; }

.tone-blue   { background: linear-gradient(160deg, #3d9ad9, #1b5e88); }
.tone-red    { background: linear-gradient(160deg, #ef4444, #991b1b); }
.tone-green  { background: linear-gradient(160deg, #22c55e, #15803d); }
.tone-slate  { background: linear-gradient(160deg, #64748b, #334155); }
.tone-amber  { background: linear-gradient(160deg, #f59e0b, #b45309); }
.tone-violet { background: linear-gradient(160deg, #8b5cf6, #5b21b6); }
.tone-cyan   { background: linear-gradient(160deg, #06b6d4, #0e7490); }
.tone-indigo { background: linear-gradient(160deg, #6366f1, #3730a3); }
</style>
