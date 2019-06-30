<template>
  <Chart
    ref="sankey"
    class="sankey-container"
    :chartId="chartId"
    :options="optionsData"
  ></Chart>
</template>

<script>
import Chart from "./Chart.vue";

import { chartOptions } from "@src/config";

export default {
  name: "Sankey",
  props: {
    chartId: String,
    data: Object
  },
  data() {
    return {
      optionsData: {},
      options: Object.assign({}, chartOptions.preCondition, {
        animation: false,
        series: [
          {
            type: "sankey",
            height: "60%",
            nodeWidth: 60,
            nodeGap: 0,
            draggable: false,
            layout: "none",
            left: "2%",
            right: "2%",
            top: "20%",
            focusNodeAdjacency: false,
            data: [],
            links: [],
            orient: "vertical",
            layoutIterations: 0,
            itemStyle: {
              borderWidth: 0
            },
            lineStyle: {
              opacity: 0.0,
              curveness: 0
            },
            emphasis: {
              lineStyle: {
                opacity: 0.0
              }
            }
          }
        ]
      })
    };
  },
  components: {
    Chart
  },
  watch: {
    data() {
      this.reset();
    }
  },
  methods: {
    reset() {
      this.options.series[0].data = [];
      this.options.series[0].links = [];

      let data = this.data;

      if (data) {
        // if (data.title) {
        //     this.options.title.text = data.title;
        // }

        if (data.root) {
          this.options.series[0].data.push({
            name: data.root.name || "",
            title: data.root.title,
            value: data.root.value || 0,
            dayRate: data.root.dayRate || 0,
            weekRate: data.root.weekRate || 0,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: data.root.color.start || "#4869D6" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: data.root.color.end || "#61B082" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          });
        }

        if (data.children) {
          data.children.forEach(item => {
            this.options.series[0].data.push({
              name: item.name || "",
              title: item.title || "",
              value: item.value || "",
              dayRate: item.dayRate || "0",
              weekRate: item.weekRate || "0",
              itemStyle: {
                color: item.color || ""
              }
            });
          });
        }

        if (data.links) {
          this.options.series[0].links = data.links;
        }
      }

      let copy = JSON.parse(JSON.stringify(this.options));

      copy.series[0].label = {
        position: "inside",
        color: "#FFF",
        fontSize: 14,
        formatter: params => {
          return params.data.title;
        }
      };

      this.optionsData = Object.assign(copy, chartOptions.postCondition);
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.sankey-container {
  width: 100%;
  height: 100%;
}
</style>
