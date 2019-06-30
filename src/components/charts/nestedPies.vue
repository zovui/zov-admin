<template>
  <Chart
    ref="nestedPies"
    class="nested-pies-container"
    :chartId="chartId"
    :options="optionsData"
    @chartReady="chartReady"
    :height="height"
  ></Chart>
</template>

<script>
import Chart from "./Chart.vue";
import { chartOptions } from "@src/config";

export default {
  name: "NestedPies",
  props: {
    chartId: String,
    data: Object,
    height: {
      type: [String, Number],
      default: "100%"
    }
  },
  data() {
    return {
      optionsData: {},
      options: Object.assign({}, chartOptions.preCondition, {
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
          padding: 0,
          height: 120,
          selectedMode: false
        },
        series: [
          {
            name: "产品分类",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          },
          {
            name: "产品",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
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
      this.options.series[1].data = [];

      let data = this.data;
      let childrenArr = [];

      if (data) {
        // if (data.title) {
        //     this.options.title.text = data.title;
        // }

        if (data.children) {
          data.children.forEach(item => {
            this.options.series[0].data.push({
              name: item.name || "",
              value: item.value || 0,
              proportion: item.proportion || 0,
              dayRate: item.dayRate || 0,
              weekRate: item.weekRate || 0,
              itemStyle: {
                color: item.color
              }
            });

            if (item.children && item.children.length) {
              let children = item.children.map(item => {
                item.itemStyle = {
                  color: item.color
                };

                return item;
              });
              childrenArr = childrenArr.concat(children);
            }
          });
        }
      }

      this.options.series[1].data = childrenArr;

      this.optionsData = Object.assign(
        JSON.parse(JSON.stringify(this.options)),
        chartOptions.postCondition
      );
    },
    chartReady() {
      // this.$refs['nestedPies'].chart.on('legendselectchanged', function (event) {
      //     let name = event.name;
      //     let selected = event.selected[name];
      //
      // });
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.nested-pies-container {
  width: 100%;
  height: 100%;
}
</style>
