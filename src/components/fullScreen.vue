<template>
  <Icon class="full-screen" :iconname="icon" @click="changeScreen"></Icon>
</template>

<script>
export default {
  name: "fullScreen",
  data() {
    return {
      isFull: false
    };
  },
  watch: {
    isFull(isFull) {
      if (isFull) {
        this.fullScreen();
      } else {
        this.exitScreen();
      }
    }
  },
  computed: {
    icon() {
      return this.isFull ? "contract" : "expand";
    }
  },
  methods: {
    changeScreen() {
      this.isFull = !this.isFull;
    },
    fullScreen() {
      let element = document.documentElement;
      let requestMethod =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen;

      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    exitScreen() {
      // 判断各种浏览器，找到正确的方法
      let exitMethod =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitCancelFullScreen ||
        document.msExitFullscreen;

      if (exitMethod) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.full-screen {
  font-size: 18px;
}
</style>
