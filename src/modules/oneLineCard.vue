<template>
  <div class="one-line-card">
    <Card
      class="card-item"
      v-for="item in cards"
      :key="item.name"
      :name="item.name"
      :value="item.value"
      :text="item.text"
    ></Card>
  </div>
</template>

<script>
import Card from "@components/card/card";
export default {
  name: "oneLineCard",
  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Card
  }
};
</script>

<style lang="scss" scoped>
.one-line-card {
  display: flex;
  .card-item {
    flex: 1;
    margin: 0 8px;
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
