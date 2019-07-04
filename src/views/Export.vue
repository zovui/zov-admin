<template>
  <div class="content-wrapper">
    <div class="one-line-chart">
      <Container class="chart-item">
        <canvas ref="canvas" id="img" width="200" height="200"></canvas>
        <Button @click="handleImgDownload">下载图片</Button>
      </Container>
      <Container class="chart-item">
        <p v-text="text"></p>
        <Button @click="handleTxtDownload">下载txt</Button>
      </Container>
    </div>
    <Container>
      <div ref="table"></div>
      <input type="file" name="file" @change="handleUpload" />
      <Button @click="handleTableDownload(tableArray)">下载excel</Button>
    </Container>
  </div>
</template>

<script>
import img from "@images/reg-bg.png";
import Container from "@components/container";

import XLSX from "xlsx";

export default {
  name: "Export",
  data() {
    return {
      img: img,
      text: { hello: "world" },
      wb: "",
      rABS: false,
      tableArray: [
        [1, 2, 3],
        [true, false, null, "sheetjs"],
        ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
        ["baz", null, "qux"]
      ]
    };
  },
  components: {
    Container
  },
  methods: {
    draw() {
      let ctx = this.$refs.canvas.getContext("2d");
      let img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0, 200, 200);
      };

      img.src = this.img;
    },
    initTable() {
      // let aoa = [
      //     ["This",   "is",     "a",    "Test"],
      //     ["வணக்கம்", "สวัสดี", "你好", "가지마"],
      //     [1,        2,        3,      4],
      //     ["Click",  "to",     "edit", "cells"]
      // ];
      // let ws = XLSX.utils.aoa_to_sheet(aoa);
      // let html_string = XLSX.utils.sheet_to_html(ws, { id: "data-table", editable: true });
      // this.$refs.table.innerHTML = html_string;
    },
    handleImgDownload() {
      // this.$refs.canvas.toBlob((blob) => {
      //     this.download(blob, 'canvas');
      // });

      let a = document.createElement("a");
      a.href = this.$refs.canvas.toDataURL("image/jpeg"); //下载图片
      a.download = "canvas.jpeg";
      a.click();
    },
    handleTxtDownload() {
      let blob = new Blob([JSON.stringify(this.text, null, 2)], {
        type: "text/plain"
      });
      this.download(blob, "text");
    },
    handleTableDownload(data) {
      let filename = "write.xlsx";
      let ws_name = "SheetJS";

      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.aoa_to_sheet(data);

      /* add worksheet to workbook */
      XLSX.utils.book_append_sheet(wb, ws, ws_name);

      /* write workbook */
      XLSX.writeFile(wb, filename);
    },
    handleUpload($event) {
      //导入
      if (!$event.target.files) {
        return;
      }
      let f = $event.target.files[0];
      let reader = new FileReader();

      reader.onload = e => {
        let data = e.target.result;

        if (this.rABS) {
          this.wb = XLSX.read(btoa(this.fixData(data)), {
            //手动转化
            type: "base64"
          });
        } else {
          this.wb = XLSX.read(data, {
            type: "binary"
          });
        }

        console.log(this.wb);
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        this.$refs.table.innerHTML = JSON.stringify(
          XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])
        );
      };
      if (this.rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    fixData(data) {
      //文件流转BinaryString
      let o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    download(blob, name) {
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.download = name;
      a.href = url;

      // 模拟a标签点击进行下载
      a.click();

      // 下载后告诉浏览器不再需要保持这个文件的引用了
      URL.revokeObjectURL(url);
    }
  },
  mounted() {
    this.draw();
    this.initTable();
  }
};
</script>

<style lang="scss">
#data-table {
  width: 100%;
}
#data-table,
#data-table th,
#data-table td {
  border: 1px solid #eee;
}
</style>
