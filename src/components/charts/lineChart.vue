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
        // let xAxis = value.xAxis;

        // let legend = value.data.map(_ => _.name);
        // let data = value.data.map(_ => _.value);

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
            bottom: 30,
            orient: "horizontal",
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
          },
          grid: {
            left: "5%",
            right: "5%",
            bottom: 80,
            containLabel: true
          },
          xAxis: {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: "联盟广告",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: "视频广告",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: "直接访问",
              type: "line",
              stack: "总量",
              areaStyle: { normal: {} },
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: "搜索引擎",
              type: "line",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "top"
                }
              },
              areaStyle: { normal: {} },
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
      }
    }
  }
};
</script>
