<template>
  <Chart
    class="doughnut-container"
    :chartId="chartId"
    :options="optionsData"
  ></Chart>
</template>

<script>
import Chart from "./Chart.vue";
import { chartOptions } from "@src/config";

export default {
  name: "Doughnut",
  props: {
    chartId: String,
    data: Object
  },
  data() {
    return {
      optionsData: {},
      options: Object.assign({}, chartOptions.preCondition, {
        color: [
          "rgba(80,130,228,1)",
          "rgba(63,178,126,1)",
          "rgba(243,83,82,1)",
          "rgba(132,210,217,1)",
          "rgba(165,202,115,1)",
          "rgba(81,180,241,1)"
        ],
        legend: {
          orient: "vertical",
          right: 2,
          top: 2,
          textStyle: {
            fontSize: 12,
            color: "rgba(0,0,0,0.64)"
          },
          itemHeight: 8,
          itemWidth: 8,
          itemGap: 12,
          padding: 0
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                rich: {
                  a: {
                    fontSize: 20,
                    lineHeight: 40
                  }
                },
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
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

      let data = this.data;

      if (data) {
        if (data.children) {
          data.children.forEach(item => {
            this.options.series[0].data.push({
              name: item.name || "",
              value: item.value || 0,
              proportion: item.proportion || 0,
              dayRate: item.dayRate || 0,
              weekRate: item.weekRate || 0
            });
          });
        }
      }

      let copy = JSON.parse(JSON.stringify(this.options));
      copy.series[0].label.normal.formatter = function(param) {
        return (
          "{a|" + param.data.name + "}\n" + (param.data.proportion || 0) + "%"
        );
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
.doughnut-container {
  width: 100%;
  height: 100%;
}
</style>
