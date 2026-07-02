<script setup lang="ts">
// Reusable "live scoreboard" placeholder.
//
// During the talk, swap `src` for the real WCS report:
//   .web-codegen-scorer/reports/<run>/index.html  (open it, or `slidev` can iframe a served URL)
// Until then this renders a styled stand-in so the slide layout is final.
const props = defineProps<{
  score?: number | string   // e.g. 100, 86.2, "NaN"
  label?: string            // e.g. "login-form · gemini-2.5-flash"
  delta?: string            // e.g. "+12" — shown as a trend pill
  src?: string              // when set, embeds the real report instead of the stand-in
}>()
</script>

<template>
  <div class="scoreboard">
    <iframe v-if="props.src" :src="props.src" class="report-frame" />
    <div v-else class="card">
      <div class="score">{{ props.score ?? '—' }}</div>
      <div class="meta">
        <span v-if="props.label" class="label">{{ props.label }}</span>
        <span v-if="props.delta" class="delta">{{ props.delta }}</span>
      </div>
      <div class="hint">live WCS scoreboard goes here</div>
    </div>
  </div>
</template>

<style scoped>
.scoreboard { display: flex; justify-content: center; }
.report-frame { width: 100%; height: 460px; border: 1px solid #ffffff22; border-radius: 12px; }
.card {
  background: linear-gradient(160deg, #14532d 0%, #052e16 100%);
  border: 1px solid #22c55e44;
  border-radius: 16px;
  padding: 2rem 3rem;
  text-align: center;
  box-shadow: 0 12px 40px #00000055;
}
.score { font-size: 5rem; font-weight: 800; line-height: 1; color: #4ade80; font-variant-numeric: tabular-nums; }
.meta { margin-top: .75rem; display: flex; gap: .75rem; justify-content: center; align-items: center; }
.label { font-size: .95rem; color: #d1fae5; opacity: .85; }
.delta { font-size: .8rem; font-weight: 700; color: #052e16; background: #4ade80; border-radius: 999px; padding: .1rem .6rem; }
.hint { margin-top: 1rem; font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: #ffffff44; }
</style>
