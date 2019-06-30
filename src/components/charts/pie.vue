<template>
  <Chart :option="option" />
</template>

<script>
import Chart from "./chart";

export default {
  name: "pie",
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
              radius: "55%",
              center: ["50%", "60%"],
              data: value,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
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
