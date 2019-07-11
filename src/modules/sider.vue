<script>
import CollapseButton from "@components/collapseButton.vue";
import { mapGetters } from "vuex";

import normalizeTree from "@libs/normalizeTree";

export default {
  name: "sider",
  data() {
    return {
      activeName: "",
      menuItemList: []
    };
  },
  render(h) {
    let renderSubTree = list => {
      if (!(list && list.length)) {
        return [];
      }

      let listDom = [];

      for (let item of list) {
        if (item.children && item.children.length) {
          listDom.push(
            h(
              "MenuSub",
              {
                props: {
                  name: item.data.name
                },
                scopedSlots: {
                  title: () => h("span", {}, [item.data.title])
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
                  name: item.data.name
                }
              },
              [h("span", {}, item.data.title)]
            )
          );
        }
      }

      return listDom;
    };

    return this.userMenuNodeTree.length && this.openedMenu.length
      ? h(
          "div",
          {
            class: "sider"
          },
          [
            h(
              "Menu",
              {
                props: {
                  "active-name": this.activeName,
                  "open-names": this.openedMenu
                },
                on: {
                  "on-change": this.change
                }
              },
              renderSubTree(this.userMenuNodeTree)
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
        )
      : "";
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
    },
    userMenuNodeTree() {
      this.compileMenuList();
    }
  },
  computed: {
    ...mapGetters(["getUserMenu"]),
    userMenuNodeTree() {
      let _userMenu = this.getUserMenu;
      let menu = [];
      if (_userMenu && _userMenu.length) {
        for (let i = 0, len = _userMenu.length; i < len; i++) {
          menu.push(
            normalizeTree(_userMenu[i], null, node => node, () => false)
          );
        }
      }

      return menu;
    },
    openedMenu() {
      let _menuItemList = this.menuItemList;
      if (_menuItemList && _menuItemList.length) {
        for (let i = 0, len = _menuItemList.length; i < len; i++) {
          if (_menuItemList[i].data.name === this.activeName) {
            _menuItemList[i].selected = true;
            break;
          }
        }

        return this.menuItemList
          .filter(item => item.opened)
          .map(item => item.data.name);
      } else {
        return [];
      }
    }
  },
  methods: {
    handleCollapse() {
      this.$emit("on-collapse", true);
    },
    change(name) {
      this.$router.push("/" + name);
    },
    compileMenuList() {
      let _userMenuNodeTree = this.userMenuNodeTree;
      const menuItemList = [];

      function flattenChildren(node) {
        menuItemList.push(node);
        if (node.children && node.children.length) {
          node.children.forEach(node => flattenChildren(node));
        }
      }

      if (_userMenuNodeTree && _userMenuNodeTree.length) {
        _userMenuNodeTree.forEach(rootNode => {
          flattenChildren(rootNode);
        });
      }

      this.menuItemList = menuItemList;
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
