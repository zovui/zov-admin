export default {
  methods: {
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
  }
};
