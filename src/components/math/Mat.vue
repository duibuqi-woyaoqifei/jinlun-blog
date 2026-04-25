<template>
  <div class="matrix" :class="[type, { 'has-brackets': true }]" :style="{ gridTemplateColumns: `repeat(${cols}, auto)` }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cols: string | number;
  type?: 'bracket' | 'det';
}>();
</script>

<style scoped>
.matrix {
  display: inline-grid;
  gap: 0.5rem 1rem;
  padding: 0.5rem 1rem;
  position: relative;
  align-items: center;
  justify-items: center;
  margin: 0 0.5rem;
}

.matrix::before,
.matrix::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
}

.matrix.bracket::before {
  left: 0;
  border: 2px solid var(--text);
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.matrix.bracket::after {
  right: 0;
  border: 2px solid var(--text);
  border-left: none;
  border-radius: 0 4px 4px 0;
}

.matrix.det::before {
  left: 0;
  border-left: 2px solid var(--text);
}

.matrix.det::after {
  right: 0;
  border-right: 2px solid var(--text);
}

/* Default to bracket if not specified */
.matrix:not(.det)::before {
  left: 0;
  border: 2px solid var(--text);
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.matrix:not(.det)::after {
  right: 0;
  border: 2px solid var(--text);
  border-left: none;
  border-radius: 0 4px 4px 0;
}
</style>
