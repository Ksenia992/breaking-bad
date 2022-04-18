import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharactersView from "../views/EpisodeView.vue";
import SerialInfoView from "@/views/SerialInfoView";
import RatingInfoView from "@/views/RatingInfoView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/characters",
    name: "characters",
    component: CharactersView,
  },
  {
    path: "/info",
    name: "serial-info",
    component: SerialInfoView,
  },
  {
    path: "/rating",
    name: "rating",
    component: RatingInfoView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
