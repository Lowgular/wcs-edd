<script setup lang="ts">
import Box from './Box.vue'

// A row (or column) of <Box>es with auto-inserted connectors.
// Optional: sequential click reveal, auto-numbered badges, and a "repair loop" bracket.
//
//   <Flow numbered reveal loop="↩ repair loop" :items="[
//     { kind: 'system', title: 'Setup',     sub: 'config + init-state' },
//     { kind: 'ai',     title: 'Implement', sub: 'LLM generates files' },
//   ]" />
interface Item {
  icon?: string; title?: string; sub?: string; badge?: string | number
  kind?: 'system' | 'ai'
  tone?: 'slate' | 'sky' | 'amber' | 'violet' | 'emerald' | 'rose' | 'cyan' | 'indigo'
}
const props = defineProps<{
  items: Item[]
  connector?: string   // glyph between boxes, default "→"
  vertical?: boolean    // stack instead of row
  numbered?: boolean    // auto 1..n badges (item.badge still wins if set)
  reveal?: boolean      // reveal box-by-box on click
  loop?: string         // label for a dashed bracket under the row
}>()

const badgeFor = (it: Item, i: number) =>
  it.badge ?? (props.numbered ? i + 1 : undefined)
const arrow = () => props.connector ?? '→'
</script>

<template>
  <div class="flow-wrap">
    <div class="flow" :class="{ vertical: props.vertical }">
      <!-- reveal path: each box (and the connector leading to it) appears on its click -->
      <template v-if="props.reveal">
        <template v-for="(it, i) in props.items" :key="i">
          <span v-if="i > 0" class="flow-arr" :class="{ vertical: props.vertical }" v-click="i + 1">{{ arrow() }}</span>
          <Box
            v-click="i + 1"
            :kind="it.kind" :tone="it.tone" :icon="it.icon"
            :title="it.title" :sub="it.sub" :badge="badgeFor(it, i)"
          />
        </template>
      </template>
      <!-- static path: everything visible immediately -->
      <template v-else>
        <template v-for="(it, i) in props.items" :key="i">
          <span v-if="i > 0" class="flow-arr" :class="{ vertical: props.vertical }">{{ arrow() }}</span>
          <Box
            :kind="it.kind" :tone="it.tone" :icon="it.icon"
            :title="it.title" :sub="it.sub" :badge="badgeFor(it, i)"
          />
        </template>
      </template>
    </div>

    <template v-if="props.loop">
      <div v-if="props.reveal" class="flow-loop" v-click="props.items.length + 1"><span>{{ props.loop }}</span></div>
      <div v-else class="flow-loop"><span>{{ props.loop }}</span></div>
    </template>
  </div>
</template>

<style scoped>
.flow-wrap { position: relative; }
.flow { display: flex; align-items: stretch; justify-content: center; gap: .25rem; }
.flow.vertical { flex-direction: column; align-items: center; }
.flow-arr { display: flex; align-items: center; font-size: 1.5rem; color: #ffffff66; padding: 0 .1rem; }
.flow-arr.vertical { padding: .1rem 0; }
.flow-loop {
  position: absolute; left: 22%; right: 22%; bottom: -34px; height: 26px;
  border: 2px dashed #f59e0b88; border-top: 0;
  border-bottom-left-radius: 14px; border-bottom-right-radius: 14px;
}
.flow-loop span {
  position: absolute; left: 50%; transform: translateX(-50%); bottom: -12px;
  background: #1e1e1e; padding: 0 .5rem; font-size: .72rem; color: #f59e0b; font-weight: 600;
}
</style>
