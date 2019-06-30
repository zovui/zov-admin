<template>
  <div class="wrapper">
    <Header>
      <img slot="logo" class="logo-img" src="~@images/logo@2x.png" alt="" />
      <template slot="center"
        >aaaaaaaaaaa</template
      >
      <template slot="right">
        <Icon
          class="header-right-contain header-expand"
          iconname="expand"
        ></Icon>
        <span class="header-right-contain header-user">user</span>
        <Icon
          class="header-right-contain header-logout"
          iconname="log-out"
        ></Icon>
      </template>
    </Header>
    <Sider></Sider>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@modules/header.vue";
import Sider from "@modules/sider.vue";

export default {
  name: "Index",
  components: {
    Header,
    Sider
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
.header-expand {
  font-size: 18px;
}
.header-logout {
  font-size: 18px;
}
.content {
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
}
</style>
