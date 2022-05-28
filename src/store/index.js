import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false,
    user: null,
    user_name: "Gust",
  },
  getters: {},
  mutations: {
    fill_user(state, user) {
      state.user = user;
      state.user_name = user.displayName;
      state.isLogin = true;
    },

    remove_user(state) {
      state.user = null;
      state.isLogin = false;
      state.user_name = "Gust";
    },
  },
  actions: {
    set_user(context, acount) {
      context.commit("fill_user", acount);
    },
    destroy_user(context) {
      context.commit("remove_user");
    },
  },

  modules: {},
});
