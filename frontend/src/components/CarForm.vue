<template>
  <form @submit.prevent="addCarHandler" class="form add-car">
    <input type="text" placeholder="Marque" v-model="car.brand" />
    <input type="text" placeholder="N° de série" v-model="car.serialNumber" />
    <input type="Number" placeholder="Chevaux" v-model="car.horsePower" />
    <button type="submit"><b-icon-plus /></button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "CarForm",
  props: {
    getCars: Function,
  },
  data() {
    return {
      iduser: this.$route.params.iduser,
      car: { brand: "", serialNumber: "", horsePower: "" },
    };
  },
  methods: {
    async addCarHandler() {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        try {
          const { data } = await axios.post(
            `/api/car/${this.iduser}`,
            this.car,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.$toastr.s(data.message);
          this.car = { brand: "", serialNumber: "", horsePower: "" };
          this.getCars();
        } catch (error) {
          this.$toastr.e(error.response.data.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
.form input {
  width: 10rem;
  margin-right: 2rem;
  height: 3rem;
}
.form button {
  height: 3rem;
  width: 3rem;
  background-color: #f8c146;
}
.form button svg {
  height: 3rem;
  width: 3rem;
}
.form button:hover {
  background-color: #f5b01c;
}

@media screen and (max-width: 900px) {
  .form {
    flex-direction: column;
  }
  .form input {
    width: 20rem;
    margin-right: 0;
    margin: auto;
    margin-bottom: 1rem;
  }
  .form button {
    height: 3rem;
    width: 20rem;
    background-color: #f8c146;
  }
}
</style>
