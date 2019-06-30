<template>
  <Chart :option="option" />
</template>

<script>
import Chart from "./chart";

export default {
  name: "line",
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
        let legend = value.map(_ => _.name);
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
          legend: {
            icon: "rect",
            borderRadius: 1,
            top: 2,
            textStyle: {
              fontSize: 12,
              color: "rgba(0,0,0,0.64)"
            },
            orient: "horizontal",
            itemHeight: 8,
            itemWidth: 8,
            itemGap: 12,
            padding: 0,
            data: legend
          },
          grid: {
            left: "0%",
            right: "8%",
            bottom: 60,
            containLabel: true
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
              data: value
            }
            // {
            //     type: 'pie',
            //     radius: '55%',
            //     center: ['50%', '60%'],
            //     data: value,
            //     itemStyle: {
            //         emphasis: {
            //             shadowBlur: 10,
            //             shadowOffsetX: 0,
            //             shadowColor: 'rgba(0, 0, 0, 0.5)'
            //         }
            //     }
            // }
          ]
        };
      }
    }
  }
};

// export default {
//     name: "line",
//     props: {
//         chartId: String,
//         data: Array,
//         colorList: Array
//     },
//     data () {
//         return {
//             optionsData: {},
//             options: Object.assign({}, {
//                 legend: {
//                     icon: 'rect',
//                     borderRadius: 1,
//                     top: 2,
//                     textStyle: {
//                         fontSize: 12,
//                         color: 'rgba(0,0,0,0.64)'
//                     },
//                     orient: 'horizontal',
//                     itemHeight: 8,
//                     itemWidth: 8,
//                     itemGap: 12,
//                     padding: 0
//                 },
//                 grid: {
//                     left: '0%',
//                     right: '8%',
//                     bottom: 60,
//                     containLabel: true
//                 },
//                 tooltip : {
//                     trigger: 'item',
//                     axisPointer: {
//                         type: 'cross',
//                         label: {
//                             backgroundColor: 'rgba(0, 0, 0, 0.5)'
//                         }
//                     },
//                     backgroundColor: 'rgba(0, 0, 0, 0.5)'
//                 },
//                 xAxis: [
//                     {
//                         type: 'category',
//                         boundaryGap: false,
//                         data: [],
//                         axisLine: {
//                             lineStyle: {
//                                 color: '#ECF3FE'
//                             }
//                         },
//                         axisTick: {
//                             lineStyle: {
//                                 color: '#DEE4EC'
//                             }
//                         },
//                         axisLabel: {
//                             color: '#CCC',
//                             fontSize: 12
//                         },
//                         axisPointer: {
//                             lineStyle: {
//                                 color: '#999'
//                             },
//                             label: {
//                                 show: true,
//                                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                                 borderWidth: 0
//                             }
//                         }
//                     }
//                 ],
//                 yAxis: [],
//                 dataZoom: [{
//                     type: 'inside',
//                     start: 0,
//                     end: 100
//                 }, {
//                     start: 0,
//                     end: 100,
//                     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//                     handleSize: '80%',
//                     handleStyle: {
//                         color: '#fff',
//                         shadowBlur: 3,
//                         shadowColor: 'rgba(0, 0, 0, 0.6)',
//                         shadowOffsetX: 2,
//                         shadowOffsetY: 2
//                     }
//                 }],
//                 series: []
//             })
//         }
//     },
//     components: {
//         Chart
//     },
//     watch: {
//         data () {
//             this.reset();
//         }
//     },
//     methods: {
//         reset () {
//             this.options.xAxis[0].data = [];
//             this.options.series = [];
//             let data = this.data;
//
//             let xAxisData = [];
//             let seriesList = {};
//
//             if (data && data.length) {
//                 let axisData = data[0].abtestList;
//
//                 let expList = Object.keys(axisData);
//                 let indexList = Object.keys(axisData[expList[0]]);
//
//                 this.options.yAxis = [
//                     {
//                         type: 'value',
//                         name: indexList[0],
//                         position: 'left',
//                         min: 0,
//                         axisLine: {
//                             lineStyle: {
//                                 color: '#DEE4EC'
//                             }
//                         },
//                         axisLabel: {
//                             color: '#CCC',
//                             formatter: '{value}'
//                         },
//                         splitLine: {
//                             show: false
//                             // lineStyle: {
//                             //     color: '#ECF3FE'
//                             // }
//                         },
//                     },
//                     {
//                         type: 'value',
//                         name: indexList[1],
//                         position: 'right',
//                         // offset: 80,
//                         min: 0,
//                         axisLine: {
//                             lineStyle: {
//                                 color: '#DEE4EC'
//                             }
//                         },
//                         splitLine: {
//                             show: false
//                             // lineStyle: {
//                             //     color: '#ECF3FE'
//                             // }
//                         },
//                         axisLabel: {
//                             color: '#CCC',
//                             formatter: '{value}' // todo 单位需要后端传
//                         }
//                     }
//                 ];
//
//                 let num = expList.length;
//
//                 for (let i in indexList) {
//                     for (let j in expList) {
//                         seriesList[`${indexList[i]}-${expList[j]}`] = {
//                             name: `${indexList[i]}-${expList[j]}`,
//                             yAxisIndex: i,
//                             type: 'line',
//                             symbol: 'none',
//                             sampling: 'average',
//                             itemStyle: {
//                                 color: this.colorList[i * num + Number(j)]
//                             },
//                             areaStyle: {
//                                 color: alphaColor(this.colorList[i * num + Number(j)], 0.9)
//                             },
//                             // areaStyle: {
//                             //     color: {
//                             //         type: 'linear',
//                             //         x: 0,
//                             //         y: 0,
//                             //         x2: 0,
//                             //         y2: 1,
//                             //         colorStops: [{
//                             //             offset: 0, color: this.colorList[i * num + Number(j)] // 0% 处的颜色
//                             //         }, {
//                             //             offset: 1, color: 'rgba(255,244,241,0)' // 100% 处的颜色
//                             //         }],
//                             //         globalCoord: false // 缺省为 false
//                             //     }
//                             // },
//                             data: []
//                         };
//                     }
//                 }
//
//                 data.forEach(item => {
//                     xAxisData.push(item.time);
//                     let abTestList = item.abtestList;
//
//                     for (let i of indexList) {
//                         for (let j of expList) {
//                             let key = `${i}-${j}`;
//                             let value = abTestList[j][i];
//
//                             seriesList[key].data.push(value ? value.replace(/,/g, '') : 0);
//                         }
//                     }
//                 });
//
//
//                 this.options.xAxis[0].data = xAxisData;
//
//                 for (let key in seriesList) {
//                     this.options.series.push(seriesList[key]);
//                 }
//                 let copyOptions = JSON.parse(JSON.stringify(this.options));
//                 // copyOptions.tooltip = {
//                 //     trigger: 'item',
//                 //     triggerOn: 'mousemove',
//                 //     backgroundColor: '#FFF',
//                 //     formatter: function (param) {
//                 //
//                 //         return `<h3 style="color: rgba(0,0,0,0.64); font-size: 14px; line-height: 20px; margin: 0; padding: 0; text-align: center;">${param.data.title || param.name}</h3>`;
//                 //     },
//                 //     extraCssText: 'box-shadow: 0 0 12px rgba(38,64,138,0.25); border-radius: 0; padding: 10px 20px 20px',
//                 //     textStyle: {
//                 //         color: 'rgba(0,0,0,0.64)',
//                 //         fontSize: 14
//                 //     }
//                 // };
//
//                 this.optionsData = copyOptions;
//             }
//         }
//     },
//     mounted () {
//         this.reset();
//     }
// }
</script>
