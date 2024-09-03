import { createRouter, createWebHistory } from "vue-router";
const Home = () => import("../pages/Home/Home.vue");
const AddEmployee = () => import("../pages/AddEmployee/AddEmployee.vue");
const UpdateEmployee = () =>
  import("../pages/UpdateEmployee/UpdateEmployee.vue");
const SingleEmployee = () =>
  import("../pages/SingleEmployee/SingleEmployee.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/add", component: AddEmployee },
    { path: "/edit/:paramId", component: UpdateEmployee },
    { path: "/:id", component: SingleEmployee },
  ],
});

export default router;
