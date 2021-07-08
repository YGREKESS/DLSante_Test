<template>
  <form @submit.prevent="submitHandler" class="form signin" autocomplete="off">
    <h2>Connexion</h2>
    <input type="text" placeholder="Votre email" v-model="user.email" />
    <input type="password" placeholder="Mot de passe" v-model="user.password" />
    <button type="submit">Connexion</button>
    <p>
      Pas de compte ? <router-link to="/inscription">M'inscrire.</router-link>
    </p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SigninForm",
  data() {
    return {
      user: { email: "", password: "" },
    };
  },
  methods: {
    async submitHandler() {
      try {
        const { data } = await axios.post("/api/user/signin", this.user);
        this.$toastr.s("Vous allez être redirigé.", data.message);
        localStorage.setItem("token", JSON.stringify(data.user.token));
        this.$router.push({
          name: "mes-infos",
          params: { iduser: data.user._id },
        });
      } catch (error) {
        this.$toastr.e(error.response.data.message);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.form input {
  margin-bottom: 1rem;
}
</style>
