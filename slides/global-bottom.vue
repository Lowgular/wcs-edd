<template>
  <!-- Persistent Lowgular mark, bottom-right on every slide except the cover (page 1). -->
  <img
    v-if="$slidev.nav.currentPage > 1"
    src="/lowgular-mark.svg"
    class="lowg-corner-mark"
    alt="Lowgular"
  />
</template>

<style>
.lowg-corner-mark {
  position: fixed;
  right: 18px;
  bottom: 14px;
  height: 22px;
  opacity: 0.45;
  z-index: 100;
  pointer-events: none;
}
</style>
