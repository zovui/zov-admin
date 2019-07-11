import Vue from "vue";
import Vuex from "vuex";

import { getUserMenu } from "./api/init";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userMenu: []
  },
  getters: {
    getUserMenu(state) {
      return state.userMenu;
    }
  },
  mutations: {
    setUserMenu(state, menu) {
      state.userMenu = menu;
    }
  },
  actions: {
    updateUserMenu({ commit }) {
      getUserMenu().then(res => {
        let data = res.data;
        if (data && data.menu && data.menu.length) {
          commit("setUserMenu", data.menu);
        }
      });
    }
  }
});
