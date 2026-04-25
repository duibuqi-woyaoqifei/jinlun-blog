<template>
  <div class="block-equation">
    <slot></slot>
  </div>
</template>

<style scoped>
.block-equation {
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 1rem;
  background: var(--code-bg);
  border-radius: 8px;
  border: 1px solid var(--border);
}
</style>
