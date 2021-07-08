<template>
  <div class="dashboard">
    <NavAdmin />
    <router-view></router-view>
  </div>
</template>

<script>
import NavAdmin from "./components/NavAdmin.vue";

export default {
  name: "Dashboard",
  components: {
    NavAdmin,
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({
        name: "connexion",
      });
    }
  },
};
</script>

<style scoped>
.dashboard {
  height: auto;
  min-height: 100vh;
  width: 100vw;
  padding: 7.5rem 5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 5rem 1rem;
  width: 50rem;
  margin: auto;
}

@media screen and (max-width: 900px) {
  .dashboard {
    padding: 0;
  }
  .item-container {
    width: 100vw;
    justify-content: space-around;
  }
}
</style>
