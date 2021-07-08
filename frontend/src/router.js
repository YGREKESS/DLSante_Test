import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./Dashboard.vue";
import UserForm from "./components/UserForm.vue";
import CarPage from "./components/CarPage.vue";
import RegisterForm from "./components/RegisterForm.vue";
import SigninForm from "./components/SigninForm.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/inscription", name: "inscription", component: RegisterForm },
    { path: "/connexion", name: "connexion", component: SigninForm },
    {
      path: "/mon-compte/:iduser",
      name: "mon-compte",
      component: Dashboard,
      children: [
        {
          path: "mes-infos",
          name: "mes-infos",
          component: UserForm,
        },
        {
          path: "mes-voitures",
          name: "mes-voitures",
          component: CarPage,
        },
      ],
    },
  ],
});
