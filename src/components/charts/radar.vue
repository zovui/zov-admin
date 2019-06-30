<template>
  <Chart :option="option" />
</template>

<script>
import Chart from "./chart";

export default {
  name: "radar",
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
        // let legend = value.map(_ => _.name);
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
            textStyle: {
              fontSize: 12,
              color: "rgba(0,0,0,0.64)"
            },
            itemHeight: 8,
            itemWidth: 8,
            // itemGap: 28,
            padding: 0,
            data: [
              "预算分配（Allocated Budget）",
              "实际开销（Actual Spending）"
            ]
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
            indicator: [
              { name: "销售（sales）", max: 6500 },
              { name: "管理（Administration）", max: 16000 },
              { name: "信息技术（Information Techology）", max: 30000 },
              { name: "客服（Customer Support）", max: 38000 },
              { name: "研发（Development）", max: 52000 },
              { name: "市场（Marketing）", max: 25000 }
            ]
          },
          series: [
            {
              name: "预算 vs 开销（Budget vs spending）",
              type: "radar",
              // areaStyle: {normal: {}},
              data: [
                {
                  value: [4300, 10000, 28000, 35000, 50000, 19000],
                  name: "预算分配（Allocated Budget）"
                },
                {
                  value: [5000, 14000, 28000, 31000, 42000, 21000],
                  name: "实际开销（Actual Spending）"
                }
              ]
            }
          ]
        };
      }
    }
  }
};
</script>
