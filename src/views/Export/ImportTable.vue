<template>
  <div class="content-wrapper">
    <Container>
      <div ref="table"></div>
      <input type="file" name="file" @change="handleUpload" />
      <Button @click="handleShow">excel to table</Button>
      <Button @click="handleArrayToTable">array to table</Button>
      <Button @click="handleJsonToTable">json to table</Button>
    </Container>
  </div>
</template>

<script>
import Container from "@components/container";
import XLSX from "xlsx";

export default {
  name: "ImportTable",
  data() {
    return {
      workbook: null,
      arrayList: [
        ["This", "is", "a", "Test"],
        ["வணக்கம்", "สวัสดี", "你好", "가지마"],
        [1, 2, 3, 4],
        ["Click", "to", "edit", "cells"]
      ],
      jsonList: [{ 列1: 1, 列2: 2, 列3: 3 }, { 列1: 4, 列2: 5, 列3: 6 }]
    };
  },
  components: {
    Container
  },
  methods: {
    handleUpload($event) {
      //导入
      if (!$event.target.files) {
        return;
      }

      let file = $event.target.files[0];
      let reader = new FileReader();

      reader.onload = e => {
        let data = e.target.result;
        this.workbook = XLSX.read(data, {
          type: "binary"
        });

        console.log(this.workbook);
      };

      reader.readAsBinaryString(file);
    },
    handleShow() {
      this.$refs.table.innerHTML = XLSX.utils.sheet_to_html(
        this.workbook.Sheets["Sheet1"]
      );
    },
    handleArrayToTable() {
      let ws = XLSX.utils.aoa_to_sheet(this.arrayList);
      this.$refs.table.innerHTML = XLSX.utils.sheet_to_html(ws);
    },
    handleJsonToTable() {
      let ws = XLSX.utils.json_to_sheet(this.jsonList);
      this.$refs.table.innerHTML = XLSX.utils.sheet_to_html(ws);
    }
  }
};
</script>

<style scoped></style>
