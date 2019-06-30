<template>
  <Chart :option="option" />
</template>

<script>
import Chart from "./chart";

export default {
  name: "sankey",
  props: {
    value: Array,
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: null
    };
  },
  components: {
    Chart
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.option = {
          title: {
            text: this.config && this.config.text,
            subtext: this.config && this.config.subtext,
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              type: "sankey",
              left: "10%",
              right: "10%",
              top: "20%",
              bottom: "20%",
              focusNodeAdjacency: "allEdges",
              itemStyle: {
                borderWidth: 0
              },
              data: [
                { name: "a" },
                { name: "b" },
                { name: "a1" },
                { name: "b1" },
                { name: "c" },
                { name: "e" }
              ],
              links: [
                { source: "a", target: "a1", value: 5 },
                { source: "e", target: "b", value: 3 },
                { source: "a", target: "b1", value: 3 },
                { source: "b1", target: "a1", value: 1 },
                { source: "b1", target: "c", value: 2 },
                { source: "b", target: "c", value: 1 }
              ],
              orient: "vertical",
              label: {
                position: "top"
              },
              lineStyle: {
                normal: {
                  color: "source",
                  curveness: 0.5
                }
              }
            }
          ]
        };
      }
    }
  }
};
</script>
