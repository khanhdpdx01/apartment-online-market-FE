<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    Footer,
  },

  computed: {
    ...mapGetters("auth", ["getLoggedIn"]),
  },
};
</script>
