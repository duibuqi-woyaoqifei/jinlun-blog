<template>
  <span class="vector-symbol">
    <span class="arrow">→</span>
    <span class="content"><slot></slot></span>
  </span>
</template>

<style scoped>
.vector-symbol {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  vertical-align: middle;
}

.arrow {
  font-size: 0.6em;
  line-height: 1;
  margin-bottom: -0.2em;
}

.content {
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
}
</style>
