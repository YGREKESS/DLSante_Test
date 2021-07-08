<template>
  <form @submit.prevent="submitHandler" class="form register">
    <h2>M'inscrire</h2>
    <input type="text" placeholder="Votre email" v-model="user.email" />
    <input type="password" placeholder="Mot de passe" v-model="user.password" />
    <input
      type="password"
      placeholder="Confirmation du mot de passe"
      v-model="user.confirmation"
    />
    <button type="submit">Inscription</button>
    <p>
      Déjà un compte ? <router-link to="/connexion">Me connecter.</router-link>
    </p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      user: { email: "", password: "", confirmation: "" },
    };
  },
  methods: {
    async submitHandler() {
      try {
        const { data } = await axios.post("/api/user/register", this.user);
        this.$toastr.s(data.message);
        this.$router.push({
          name: "connexion",
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
