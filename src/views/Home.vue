<template>
  <div class="content-wrapper">
    <OneLineCard :cards="cardList"></OneLineCard>
    <div class="one-line-chart">
      <Container class="chart-item">
        <Pie :value="chartData"></Pie>
      </Container>
      <Container class="chart-item">
        <Doughnut :value="chartData"></Doughnut>
      </Container>
    </div>
    <div class="one-line-chart">
      <Container class="chart-item">
        <Radar></Radar>
      </Container>
      <Container class="chart-item">
        <Sankey></Sankey>
      </Container>
    </div>
    <div class="one-line-chart">
      <Container class="chart-item">
        <NestedPies></NestedPies>
      </Container>
      <Container class="chart-item">
        <LineChart></LineChart>
      </Container>
    </div>
  </div>
</template>

<script>
import OneLineCard from "@modules/oneLineCard";
import Container from "@components/container";
import Pie from "@components/charts/pie";
import Doughnut from "@components/charts/doughnut";
import Radar from "@components/charts/radar";
import Sankey from "@components/charts/sankey";
import LineChart from "@components/charts/lineChart";
import NestedPies from "@components/charts/nestedPies";

import chartData from "@src/mock/chartData.json";

export default {
  name: "Home",
  data() {
    return {
      chartData: chartData,
      cardList: [
        {
          name: "PV",
          value: "4,567,432",
          text: "总页面浏览量"
        },
        {
          name: "UV",
          value: "345,430",
          text: "总用户浏览量"
        },
        {
          name: "点击",
          value: "12,567,798",
          text: "总点击量"
        },
        {
          name: "电话",
          value: "68,435",
          text: "总电话数"
        },
        {
          name: "收入",
          value: "435,455"
        }
      ]
    };
  },
  components: {
    Pie,
    Doughnut,
    Radar,
    Sankey,
    NestedPies,
    LineChart,
    OneLineCard,
    Container
  }
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 30px 40px;
}
.one-line-chart {
  display: flex;
  margin: 20px 0;
}
.chart-item {
  flex: 1;
  height: 400px;
  margin: 0 10px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
}
</style>
