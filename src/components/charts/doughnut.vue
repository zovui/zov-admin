<template>
  <Chart :option="option" />
</template>

<script>
import Chart from "./chart";

export default {
  name: "doughnut",
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
            right: 20,
            top: 15,
            data: legend
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
          ]
        };
      }
    }
  }
};
</script>
