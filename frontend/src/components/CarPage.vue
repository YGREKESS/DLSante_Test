<template>
  <div class="car-page">
    <CarForm :getCars="getCars" />
    <div class="car-container">
      <p v-if="cars.length === 0">Aucun véhicule enregistré.</p>
      <CarItem
        v-for="(car, index) in cars"
        :key="index"
        :idcar="car.idcar"
        :brand="car.brand"
        :serialNumber="car.serialnumber"
        :horsePower="car.horsepower"
        :getCars="getCars"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CarForm from "./CarForm.vue";
import CarItem from "./CarItem.vue";

export default {
  name: "CarPage",
  components: {
    CarForm,
    CarItem,
  },
  data() {
    return {
      cars: [],
    };
  },
  methods: {
    async getCars() {
      const iduser = this.$route.params.iduser;
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        try {
          const { data } = await axios.get(`/api/car/${iduser}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.cars = data;
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    },
  },
  async mounted() {
    this.getCars();
  },
};
</script>

<style scoped>
.car-page {
  height: auto;
  width: 100%;
  align-self: flex-start;
}
.car-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 5rem 0 0 0;
  width: 50rem;
  margin: auto;
}

@media screen and (max-width: 900px) {
  .car-page {
    padding: 7.5rem 0 0 0;
  }
  .car-container {
    width: 100vw;
    justify-content: space-around;
  }
}
</style>
