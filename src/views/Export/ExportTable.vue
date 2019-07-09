<template>
  <div class="content-wrapper">
    <Container>
      <div>
        <table ref="table">
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
          </tr>
          <tr>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
          </tr>
          <tr>
            <th>e</th>
            <th>f</th>
            <th>g</th>
            <th>h</th>
          </tr>
          <tr>
            <th>i</th>
            <th>j</th>
            <th>k</th>
            <th>l</th>
          </tr>
        </table>
      </div>
      <Button @click="handleTableDownload">table to excel</Button>
      <div></div>
      <Button @click="handleArrayDownload">array to excel</Button>
      <Button @click="handleJsonDownload">json to excel</Button>
    </Container>
  </div>
</template>

<script>
import Container from "@components/container";
import XLSX from "xlsx";

export default {
  name: "ExportTable",
  data() {
    return {
      arrayList: [
        ["This", "is", "a", "Test"],
        ["வணக்கம்", "สวัสดี", "你好", "가지마"],
        [1, 2, 3, 4],
        ["Click", "to", "edit", "cells"]
      ],
      jsonList: [{ 列1: 1, 列2: 2, 列3: 3 }, { 列1: 4, 列3: 6 }]
    };
  },
  components: {
    Container
  },
  methods: {
    handleTableDownload() {
      let element = this.$refs.table;
      let wb = XLSX.utils.table_to_book(element, { sheet: "Sheet JS" });
      return XLSX.writeFile(wb, "text.xlsx");
    },
    handleArrayDownload() {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.aoa_to_sheet(this.arrayList);

      XLSX.utils.book_append_sheet(wb, ws, "array");
      XLSX.writeFile(wb, "array.xlsx");
    },
    handleJsonDownload() {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(this.jsonList, {
        header: ["列1", "列2", "列3"],
        skipHeader: true
      });

      XLSX.utils.book_append_sheet(wb, ws, "json");
      XLSX.writeFile(wb, "json.xlsx");
    }
  }
};
</script>

<style scoped></style>
