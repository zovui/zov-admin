<template>
  <div class="content-wrapper">
    <Container class="chart-item">
      <canvas ref="canvas" id="img" width="200" height="200"></canvas>
      <Button @click="handleImgDownload">下载图片</Button>
    </Container>
  </div>
</template>

<script>
import Container from "@components/container";
import img from "@images/reg-bg.png";

export default {
  name: "ExportCanvas",
  data() {
    return {
      img: img
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
    handleImgDownload() {
      // this.$refs.canvas.toBlob((blob) => {
      //     this.download(blob, 'canvas');
      // });

      let a = document.createElement("a");
      a.href = this.$refs.canvas.toDataURL("image/jpeg"); //下载图片
      a.download = "canvas.jpeg";
      a.click();
    }
  },
  mounted() {
    this.draw();
  }
};
</script>

<style scoped></style>
