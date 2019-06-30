<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "container"
};
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #e8e8e8;
}
</style>
