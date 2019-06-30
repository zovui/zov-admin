<template>
  <Chart
    class="radar-container"
    :chartId="chartId"
    :options="optionsData"
  ></Chart>
</template>

<script>
import Chart from "./Chart.vue";

import upIcon from "@assets/img/icon-up.png";
import downIcon from "@assets/img/icon-down.png";
import { chartOptions } from "@src/config";
import { alphaColor } from "@utils/utils.js";

export default {
  name: "Radar",
  props: {
    chartId: String,
    title: String,
    itemName: String,
    data: Object
  },
  data() {
    return {
      optionsData: {},
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: "#FFF",
        formatter: param => {
          let data = param.data;
          let value = data.value;
          let otherData = data.otherData;

          let dataList = [];

          for (let i = 0, len = otherData.length; i < len; i++) {
            dataList.push(`
                                <li style="padding-left: 12px;">
                                    <span style="display: inline-block; width: 60px;">${
                                      otherData[i].name
                                    }</span>
                                    <span style="display: inline-block; width: 100px; text-align: center;">${
                                      value[i]
                                    }</span>
                                    <span style="display: inline-block; width: 80px;">
                                        <strong style="margin-left: 8px;">
                                        ${
                                          otherData[i].dayRate == 0
                                            ? "-"
                                            : `<img src="${
                                                otherData[i].dayRate > 0
                                                  ? upIcon
                                                  : downIcon
                                              }" alt="" style="margin-right: 5px; width: 10px; height: 10px;">${
                                                otherData[i].dayRate > 0
                                                  ? `<span style="color: rgba(255,85,46,1);">+${otherData[i].dayRate}%</span>`
                                                  : `<span style="color: rgba(97,176,130,1);">${otherData[i].dayRate}%</span>`
                                              }`
                                        }</strong>
                                    </span>
                                    <span style="display: inline-block; width: 80px;">
                                        <strong style="margin-left: 8px;">
                                        ${
                                          otherData[i].weekRate == 0
                                            ? "-"
                                            : `<img src="${
                                                otherData[i].weekRate > 0
                                                  ? upIcon
                                                  : downIcon
                                              }" alt="" style="margin-right: 5px; width: 10px; height: 10px;">${
                                                otherData[i].weekRate > 0
                                                  ? `<span style="color: rgba(255,85,46,1);">+${otherData[i].weekRate}%</span>`
                                                  : `<span style="color: rgba(97,176,130,1);">${otherData[i].weekRate}%</span>`
                                              }`
                                        }</strong>
                                    </span>
                                </li>`);
          }

          return `
                            <h3 style="color: rgba(0,0,0,0.64); font-size: 14px; line-height: 20px; margin: 0; padding: 0; text-align: center; margin-bottom: 10px;">${param.name +
                              this.title}</h3>
                            <ul style="list-style: none; font-size: 12px; line-height: 26px;">
                                <li style="background-color: #FAFAFA; padding-left: 12px;">
                                <span style="display: inline-block; width: 60px;">业务线</span>
                                <span style="display: inline-block; width: 100px; text-align: center;">${
                                  this.itemName
                                }</span>
                                <span style="display: inline-block; width: 80px; text-align: center;">日环比</span>
                                <span style="display: inline-block; width: 80px; text-align: center;">周同比</span>
                                </li>
                                ${dataList.join("")}</ul>`;
        },
        extraCssText:
          "box-shadow: 0 0 12px rgba(38,64,138,0.25); border-radius: 0; padding: 10px 20px 20px",
        textStyle: {
          color: "rgba(0,0,0,0.64)",
          fontSize: 14
        }
      },
      options: Object.assign({}, chartOptions.preCondition, {
        legend: {
          right: 2,
          top: 2,
          textStyle: {
            fontSize: 12,
            color: "rgba(0,0,0,0.64)"
          },
          itemHeight: 8,
          itemWidth: 8,
          itemGap: 28,
          padding: 0
        },
        radar: {
          name: {
            textStyle: {
              color: "rgba(0,0,0,0.64)",
              fontSize: 12
            }
          },
          radius: "56%",
          center: ["50%", "54%"],
          indicator: [],
          splitArea: {
            areaStyle: {
              color: ["rgba(255,255,255,1)", "rgba(250,250,250,1)"]
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(232,232,232,1)"
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(232,232,232,1)"
            }
          }
        },
        series: [
          {
            type: "radar",
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
      this.options.radar.indicator = [];
      this.options.series[0].data = [];

      let data = this.data;

      if (data) {
        // if (data.title) {
        //     this.options.title.text = data.title;
        // }

        if (data.axis.length) {
          this.options.radar.indicator = data.axis.map(item => {
            return {
              name: item.name,
              max: item.value,
              dayRate: item.dayRate,
              weekRate: item.weekRate
            };
          });
        }

        if (data.children.length) {
          for (let i = 0, len = data.children.length; i < len; i++) {
            let children = data.children[i];
            let otherData = [];
            let value = [];

            for (let i = 0, len = children.length; i < len; i++) {
              value.push(children[i].value || 0);
              otherData.push({
                name: data.axis[i].name,
                dayRate: children[i].dayRate || 0,
                weekRate: children[i].weekRate || 0
              });
            }

            this.options.series[0].data.push({
              value: value,
              otherData: otherData,
              name: data.lines[i],
              itemStyle: {
                borderColor: data.colorList[i],
                borderWidth: 1,
                color: data.colorList[i]
              },
              lineStyle: {
                color: data.colorList[i]
              },
              areaStyle: {
                color: alphaColor(data.colorList[i], 0.9)
              },
              emphasis: {
                itemStyle: {
                  borderColor: data.colorList[i],
                  borderWidth: 2,
                  shadowBlur: 5,
                  shadowColor: data.colorList[i]
                }
              }
            });
          }
        }
      }

      this.optionsData = Object.assign(
        JSON.parse(JSON.stringify(this.options)),
        {
          tooltip: this.tooltip
        }
      );
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.radar-container {
  width: 100%;
  height: 100%;
}
</style>
