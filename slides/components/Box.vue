<script setup lang="ts">
// A single designed diagram rectangle. Fixed typography / centering / rounding —
// only the COLOR and ICON change, driven by the semantic `kind`:
//   system → blue,  deterministic, runs on your machine (programmatic)
//   ai     → red,   probabilistic, an LLM call / agent
// `icon` overrides the kind default; `tone` still works for non-semantic boxes (e.g. RAG).
const props = defineProps<{
  kind?: 'system' | 'ai'
  tone?: 'slate' | 'sky' | 'amber' | 'violet' | 'emerald' | 'rose' | 'cyan' | 'indigo'
  icon?: string
  title?: string
  sub?: string
  badge?: string | number
  w?: string
}>()

// Default icon per kind — swap these once you've chosen on the "Diagram language" slide.
const KIND_ICON: Record<string, string> = { system: '</>', ai: '🤖' }

const resolvedIcon = () => props.icon ?? (props.kind ? KIND_ICON[props.kind] : undefined)
const colorClass = () => props.kind ? `kind-${props.kind}` : `tone-${props.tone ?? 'slate'}`
</script>

<template>
  <div class="dbox" :class="colorClass()" :style="props.w ? { width: props.w } : {}">
    <span v-if="props.badge !== undefined" class="dbadge">{{ props.badge }}</span>
    <span v-if="resolvedIcon()" class="dico">{{ resolvedIcon() }}</span>
    <span v-if="props.title" class="dtitle">{{ props.title }}</span>
    <span v-if="props.sub" class="dsub">{{ props.sub }}</span>
    <slot />
  </div>
</template>

<style scoped>
.dbox {
  width: 132px; border-radius: 14px; padding: .9rem .5rem .8rem;
  display: flex; flex-direction: column; align-items: center; gap: .15rem;
  color: #fff; position: relative; border: 1px solid #ffffff22;
  box-shadow: 0 12px 34px #00000055;
}
.dbadge {
  position: absolute; top: -11px; left: -11px; width: 26px; height: 26px;
  border-radius: 50%; background: #fff; color: #0f172a; font-weight: 800;
  font-size: .8rem; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px #00000066;
}
.dico { font-size: 1.9rem; line-height: 1; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.dtitle { font-weight: 700; font-size: .92rem; margin-top: .2rem; text-align: center; }
.dsub { font-size: .66rem; opacity: .85; text-align: center; line-height: 1.2; }

/* semantic kinds — system uses the Lowgular brand blue */
.kind-system { background: linear-gradient(160deg, #3d9ad9, #1b5e88); }
.kind-ai     { background: linear-gradient(160deg, #ef4444, #991b1b); }

/* non-semantic tones (kept for the RAG diagram etc.) */
.tone-slate   { background: linear-gradient(160deg, #64748b, #334155); }
.tone-sky     { background: linear-gradient(160deg, #0ea5e9, #075985); }
.tone-amber   { background: linear-gradient(160deg, #f59e0b, #b45309); }
.tone-violet  { background: linear-gradient(160deg, #8b5cf6, #5b21b6); }
.tone-emerald { background: linear-gradient(160deg, #22c55e, #15803d); }
.tone-rose    { background: linear-gradient(160deg, #f43f5e, #9f1239); }
.tone-cyan    { background: linear-gradient(160deg, #06b6d4, #0e7490); }
.tone-indigo  { background: linear-gradient(160deg, #6366f1, #3730a3); }
</style>
