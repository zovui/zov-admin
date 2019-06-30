<template>
  <div class="card">
    <label class="card-name">
      {{ name }}
      <ToolTip v-if="text" :text="text" placement="right">
        <Icon class="card-icon" iconname="help-circle-outline"></Icon>
      </ToolTip>
    </label>
    <p class="card-value">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    name: String,
    value: String,
    text: String
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background-color: #f4f4f4;
  min-width: 150px;
  color: #333;
  &-name {
    position: absolute;
    font-size: 12px;
    line-height: 14px;
    left: 20px;
    top: 10px;
  }
  &-value {
    font-size: 22px;
    line-height: 30px;
    text-align: center;
    padding: 30px 0;
  }
  &-icon {
    color: #8a9dba;
    font-size: 14px;
  }
}
</style>
<style lang="scss">
.card {
  .zov-tooltip {
    vertical-align: middle;
  }
  .zov-tooltip-body {
    width: auto;
  }
}
</style>
