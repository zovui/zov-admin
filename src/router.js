import Vue from "vue";
import Router from "vue-router";
import Login from "./pages/Login.vue";
import Index from "./pages/Index.vue";
import Home from "./views/Home.vue";
import ExportCanvas from "./views/Export/ExportCanvas.vue";
import ExportText from "./views/Export/ExportText.vue";
import ExportTable from "./views/Export/ExportTable.vue";
import ImportTable from "./views/Export/ImportTable.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      children: [
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/exportCanvas",
          name: "exportCanvas",
          component: ExportCanvas
        },
        {
          path: "/exportText",
          name: "exportText",
          component: ExportText
        },
        {
          path: "/exportTable",
          name: "exportTable",
          component: ExportTable
        },
        {
          path: "/importTable",
          name: "importTable",
          component: ImportTable
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});
