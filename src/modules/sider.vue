<!--<template>-->
<!--<div class="sider">-->
<!--<Menu-->
<!--:active-name="activeName"-->
<!--:open-names="['2', '3']"-->
<!--@on-change="change"-->
<!--&gt;-->
<!--<MenuOption name="1">-->
<!--<Icon iconname="home" />-->
<!--首页-->
<!--</MenuOption>-->
<!--<MenuSub name="4">-->
<!--<MenuOption name="4-1" />-->
<!--<MenuOption name="4-2" />-->
<!--<MenuSub name="4-3">-->
<!--<MenuOption name="4-3-1" />-->
<!--<MenuOption name="4-3-2" />-->
<!--<MenuSub name="4-3-3">-->
<!--<MenuOption name="4-3-3-1" />-->
<!--<MenuOption name="4-3-3-2" />-->
<!--</MenuSub>-->
<!--</MenuSub>-->
<!--<MenuSub name="4-4">-->
<!--<MenuOption name="4-4-1" />-->
<!--<MenuOption name="4-4-2" />-->
<!--</MenuSub>-->
<!--</MenuSub>-->
<!--</Menu>-->
<!--<CollapseButton class="sider-collapse" toward="back" @on-click="handleCollapse" />-->
<!--</div>-->
<!--</template>-->

<script>
import CollapseButton from "@components/collapseButton.vue";

export default {
  name: "sider",
  data() {
    return {
      activeName: "",
      navList: [
        {
          name: "home",
          title: "首页"
        },
        {
          name: "export",
          title: "导出",
          children: [
            {
              name: "exportCanvas",
              title: "导出图片"
            },
            {
              name: "exportText",
              title: "导出txt"
            },
            {
              name: "exportTable",
              title: "导出table"
            },
            {
              name: "importTable",
              title: "导入table"
            }
          ]
        }
      ]
    };
  },
  render(h) {
    let renderSubTree = list => {
      let listDom = [];
      for (let item of list) {
        if (item.children && item.children.length) {
          listDom.push(
            h(
              "MenuSub",
              {
                props: {
                  name: item.name
                },
                class: "second-menu",
                scopedSlots: {
                  title: () => h("span", {}, [item.title])
                }
              },
              renderSubTree(item.children)
            )
          );
        } else {
          listDom.push(
            h(
              "MenuOption",
              {
                props: {
                  name: item.name
                }
              },
              [
                h(
                  "span",
                  {
                    // 'class': 'leaf-menu'
                  },
                  item.title
                )
              ]
            )
          );
        }
      }

      return listDom;
    };

    return h(
      "div",
      {
        class: "sider"
      },
      [
        h(
          "Menu",
          {
            props: {
              "active-name": this.activeName
            },
            on: {
              "on-change": this.change
            }
          },
          renderSubTree(this.navList)
        ),
        h("CollapseButton", {
          class: "sider-collapse",
          props: {
            toward: "back"
          },
          on: {
            "on-click": this.handleCollapse
          }
        })
      ]
    );
  },
  components: {
    CollapseButton
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.activeName = route.name;
      }
    }
  },
  methods: {
    handleCollapse() {
      this.$emit("on-collapse", true);
    },
    change(name) {
      this.$router.push("/" + name);
    }
  }
};
</script>

<style lang="scss" scoped>
.sider {
  position: absolute;
  top: 70px;
  bottom: 0;
  overflow: hidden;
}
.sider-collapse {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>

<style lang="scss">
.sider {
  .zov-menu-vertical {
    height: 100%;
    overflow: auto;
  }
}
</style>
