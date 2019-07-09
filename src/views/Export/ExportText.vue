<template>
  <div class="content-wrapper">
    <Container class="chart-item">
      <p v-text="text"></p>
      <Button @click="handleTxtDownload">下载txt</Button>
    </Container>
  </div>
</template>

<script>
import Container from "@components/container";
import exportMixin from "./exportMixin";

export default {
  name: "ExportText",
  mixins: [exportMixin],
  data() {
    return {
      text: { hello: "world" }
    };
  },
  components: {
    Container
  },
  methods: {
    handleTxtDownload() {
      let blob = new Blob([JSON.stringify(this.text, null, 2)], {
        type: "text/plain"
      });
      this.download(blob, "text");
    }
  }
};
</script>

<style scoped></style>
