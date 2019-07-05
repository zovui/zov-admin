<template>
  <span class="collapse-btn" :style="collapseStyle" @click="handleClick">
    <Icon class="collapse-btn-icon" :iconname="icon"></Icon>
  </span>
</template>

<script>
export default {
  name: "collapseButton",
  props: {
    toward: {
      type: String,
      default: "back",
      validator(value) {
        return ~["back", "forward"].indexOf(value);
      }
    }
  },
  computed: {
    icon() {
      return "arrow-" + this.toward;
    },
    collapseStyle() {
      return {
        "border-radius": this.toward === "back" ? "2px 0 0 2px" : "0 2px 2px 0"
      };
    }
  },
  methods: {
    handleClick() {
      this.$emit("on-click");
    }
  }
};
</script>

<style lang="scss" scoped>
.collapse-btn {
  position: absolute;
  width: 12px;
  height: 30px;
  background-color: #e9edf0;
  border-radius: 2px 0 0 2px;
  line-height: 30px;
  &-icon {
    color: #b7babe;
  }
  &:hover {
    .collapse-btn-icon {
      color: #666;
    }
  }
}
</style>
