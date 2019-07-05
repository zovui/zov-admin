<template>
  <div class="wrapper">
    <Header>
      <img slot="logo" class="logo-img" src="~@images/logo@2x.png" alt="" />
      <template slot="center"
        >aaaaaaaaaaa</template
      >
      <template slot="right">
        <FullScreen class="header-right-contain"></FullScreen>
        <span class="header-right-contain header-user">user</span>
        <Icon
          class="header-right-contain header-logout"
          iconname="log-out"
        ></Icon>
      </template>
    </Header>
    <Sider
      class="sider-container"
      :style="siderStyle"
      @on-collapse="handleCollapse"
    ></Sider>
    <div class="content" :style="contentStyle">
      <CollapseButton
        v-show="collapse"
        class="sider-show"
        toward="forward"
        @on-click="handleCollapse"
      />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@modules/header.vue";
import Sider from "@modules/sider.vue";
import CollapseButton from "@components/collapseButton.vue";
import FullScreen from "@components/fullScreen.vue";

export default {
  name: "Index",
  provide() {
    return {
      getCollapseContainer: this.getCollapseContainer.bind(this)
    };
  },
  data() {
    return {
      collapse: false,
      collapseContainer: []
    };
  },
  computed: {
    siderStyle() {
      return {
        width: this.collapse ? 0 : "240px"
      };
    },
    contentStyle() {
      return {
        left: this.collapse ? 0 : "240px"
      };
    }
  },
  components: {
    Header,
    Sider,
    CollapseButton,
    FullScreen
  },
  methods: {
    handleCollapse() {
      this.collapse = !this.collapse;
      this.changeViewSize();
    },
    getCollapseContainer($element) {
      this.collapseContainer.push($element);
    },
    changeViewSize() {
      this.collapseContainer.forEach($element => {
        $element.handleResize();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  position: relative;
}
.logo-img {
  width: 130px;
  vertical-align: middle;
}
.header-right-contain {
  color: #fff;
  margin-left: 20px;
  vertical-align: middle;
}
.header-logout {
  font-size: 18px;
}
.sider-container {
  position: absolute;
}
.content {
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
}
.sider-show {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
