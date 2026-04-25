<template>
  <span class="math-term">
    <slot></slot>
  </span>
</template>

<style scoped>
.math-term {
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
  font-size: 1.15em;
  padding: 0 0.15em;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
}
</style>
