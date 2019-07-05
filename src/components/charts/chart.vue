<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script>
import chartTheme from "./chartTheme";
export default {
  name: "Chart",
  inject: ["getCollapseContainer"],
  props: {
    option: Object
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    option: {
      immediate: true,
      handler() {
        this.setOption();
      }
    },
    chart() {
      this.$emit("on-ready");
    }
  },
  methods: {
    handleResize() {
      this.$nextTick(() => {
        this.chart.resize();
      });
    },
    setOption() {
      if (this.option && this.chart) {
        this.chart.setOption(this.option, true);
        setTimeout(() => {
          this.handleResize();
        }, 0);
      }
    },
    loadEcharts() {
      return new Promise((resolve, reject) => {
        if (!this.$echarts) {
          import(/* webpackChunkName: "echarts" */ "@src/plugins/echarts.js")
            .then(modules => {
              this.$echarts = modules.default;
              resolve();
            })
            .catch(() => {
              reject();
            });
        } else {
          resolve();
        }
      });
    }
  },
  created() {
    // 异步加载echarts
    this.loadEcharts().then(() => {
      this.$echarts.registerTheme("chartTheme", chartTheme);

      this.chart = this.$echarts.init(this.$refs.chart, chartTheme);

      this.setOption();
      window.addEventListener("resize", this.handleResize);
    });
  },
  mounted() {
    this.getCollapseContainer(this);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
