<script setup lang="ts">
// One Definition-of-Done column (white-box or black-box). Each category expands into
// sub-items tagged by eval quadrant — a colored dot + the quadrant label + the detail.
// Colors match the quadrant slide: Exact=green, Semantic=orange, Structural=yellow, Preference=rose.
interface Sub { q: 'exact' | 'semantic' | 'structural' | 'preference'; text: string }
interface Cat { name: string; subs: Sub[] }
defineProps<{ title: string; lens?: string; box?: 'white' | 'black'; cats: Cat[] }>()
const Q: Record<string, { c: string; label: string }> = {
  exact: { c: '#22c55e', label: 'Exact' },
  semantic: { c: '#f97316', label: 'Semantic' },
  structural: { c: '#eab308', label: 'Structural' },
  preference: { c: '#f43f5e', label: 'Preference' },
}
</script>

<template>
  <div class="dod" :class="box === 'black' ? 'dod-black' : 'dod-white'">
    <div class="head">
      <span class="t">{{ title }}</span>
      <span class="lens">{{ lens }}</span>
    </div>
    <div class="cat" v-for="c in cats" :key="c.name">
      <div class="cname">{{ c.name }}</div>
      <div class="sub" v-for="(s, i) in c.subs" :key="i">
        <span class="dot" :style="{ background: Q[s.q].c }" />
        <span class="ql" :style="{ color: Q[s.q].c }">{{ Q[s.q].label }}</span>
        <span class="txt">{{ s.text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dod { border-radius: 14px; padding: .85rem 1rem; height: 100%; }
.dod-white { background: rgba(255, 255, 255, .08); border: 1px solid rgba(255, 255, 255, .25); }
.dod-black { background: rgba(0, 0, 0, .40); border: 1px solid rgba(255, 255, 255, .10); }
.head { display: flex; align-items: baseline; gap: .5rem; margin-bottom: .5rem; }
.head .t { font-size: 1.02rem; font-weight: 800; }
.head .lens { font-size: .6rem; text-transform: uppercase; letter-spacing: .08em; opacity: .55; }
.cat { margin-bottom: .35rem; }
.cname { font-size: .8rem; font-weight: 700; margin-bottom: .05rem; }
.sub { display: flex; align-items: center; gap: .4rem; font-size: .7rem; line-height: 1.45; padding-left: .15rem; }
.dot { width: .48rem; height: .48rem; border-radius: 999px; flex: none; }
.ql { font-weight: 700; min-width: 4.7rem; flex: none; }
.txt { opacity: .68; }
</style>
