import Vue from "vue";
import Router from "vue-router";
import Login from "./pages/Login.vue";
import Index from "./pages/Index.vue";
import Home from "./views/Home.vue";
import Export from "./views/Export.vue";

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
          component: Home,
          name: "home"
        },
        {
          path: "/export",
          component: Export
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
