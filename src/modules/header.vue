<template>
  <div class="header">
    <div class="logo">
      <slot name="logo"></slot>
    </div>
    <div class="header-center">
      <slot name="center"></slot>
    </div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style lang="scss" scoped>
$header-bg-color: #00152b;
.header {
  height: 70px;
  background-color: $header-bg-color;
  padding: 0 30px;
  position: relative;
}
.logo {
  line-height: 70px;
  font-size: 0;
  position: absolute;
}
.header-center {
  line-height: 70px;
  padding: 0 50px 0 250px;
}
.header-right {
  position: absolute;
  right: 30px;
  top: 0;
  line-height: 70px;
}
</style>
