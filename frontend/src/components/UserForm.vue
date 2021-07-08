<template>
  <form @submit.prevent="submitHandler" class="form update-user">
    <h2>Mes infos</h2>
    <input type="text" placeholder="Votre email" v-model="user.email" />
    <input
      type="password"
      placeholder="Mot de passe actuel"
      v-model="user.actualPassword"
    />
    <input
      type="password"
      placeholder="Nouveau mot de passe"
      v-model="user.newPassword"
    />
    <button type="submit">Mettre à jour</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "UserForm",
  data() {
    return {
      iduser: this.$route.params.iduser,
      user: {
        email: "",
        actualPassword: "",
        newPassword: "",
      },
    };
  },
  methods: {
    async submitHandler() {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        try {
          const { data } = await axios.put(
            `/api/user/${this.iduser}`,
            this.user,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          localStorage.setItem("token", JSON.stringify(data.token));
          this.$toastr.s(data.message);
        } catch (error) {
          this.$toastr.e(error.response.data.message);
        }
      }
    },
  },
  async mounted() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      try {
        const { data } = await axios.get(`/api/user/${this.iduser}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.user = {
          email: data.email,
          actualPassword: "",
          newPassword: "",
        };
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  height: auto;
  width: 100%;
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.form input {
  margin-bottom: 1rem;
}
@media screen and (max-width: 900px) {
  .form {
    justify-content: center;
  }
}
</style>
