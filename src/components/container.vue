<template>
  <div class="card-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "cardPanel"
};
</script>

<style lang="scss" scoped>
.card-panel {
  border: 1px solid #eee;
}
</style>
