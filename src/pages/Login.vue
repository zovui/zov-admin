<template>
  <div class="login">
    <div class="login-container">
      <Icon class="login-icon" iconname="person"></Icon>
      <Input class="login-input" size="large" placeholder="用户名" />
      <Input class="login-input" size="large" placeholder="密码" />
      <Button class="login-button" size="large" looks="primary" @click="login"
        >登录</Button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background-image: url(~@images/reg-bg.png);
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  &-container {
    width: 360px;
    height: 320px;
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 40px 60px;
    text-align: center;
  }
  &-icon {
    font-size: 40px;
    color: #9c9c9c;
    margin-bottom: 40px;
    display: inline-block;
  }
  &-input {
    display: block;
    margin-bottom: 20px;
    width: 240px;
  }
  &-button {
    width: 240px;
  }
}
</style>
