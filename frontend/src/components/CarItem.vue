<template>
  <form
    class="car-item"
    :id="car.idcar"
    @submit.prevent="updateHandler(car.idcar)"
  >
    <b-icon-x-circle-fill
      class="delete-icon"
      v-on:click="deleteHandler(car.idcar)"
    />
    <font-awesome-icon class="car-icon" icon="car" size="4x" />
    <div class="form-group">
      <label>Marque</label>
      <input v-model="car.brand" />
    </div>
    <div class="form-group">
      <label>N° de série</label>
      <input v-model="car.serialNumber" />
    </div>
    <div class="form-group">
      <label>Chevaux</label>
      <input v-model="car.horsePower" type="number" />
    </div>
    <button class="update-handler" type="submit" :disabled="update">
      <font-awesome-icon icon="check" size="1x" />
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "CarItem",
  props: {
    idcar: Number,
    brand: String,
    serialNumber: String,
    horsePower: Number,
    getCars: Function,
  },
  data() {
    return {
      car: {
        idcar: this.idcar,
        brand: this.brand,
        serialNumber: this.serialNumber,
        horsePower: this.horsePower,
      },
      update: true,
    };
  },
  methods: {
    disableHandler() {
      this.update = false;
    },
    async updateHandler(idcar) {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data } = await axios.put(`/api/car/${idcar}`, this.car, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$toastr.s(data.message);
        this.update = true;
      } catch (error) {
        this.$toastr.e(error.response.data.message);
      }
    },
    async deleteHandler(idcar) {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data } = await axios.delete(`/api/car/${idcar}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$toastr.s(data.message);
        this.getCars();
      } catch (error) {
        this.$toastr.e(error.response.data.message);
      }
    },
  },
  watch: {
    car: {
      handler: function() {
        this.disableHandler(); // call it in the context of your component object
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.car-item {
  padding: 1rem;
  height: auto;
  width: fit-content;
  min-width: 10rem;
  color: #000;
  margin: 1rem 2rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.car-item .car-icon {
  margin: 1rem;
}
.car-item .delete-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: red;
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  cursor: pointer;
  transition: 0.25s;
}
.car-item .delete-icon:hover {
  transform: scale(1.1);
}
.car-item h2 {
  text-transform: capitalize;
}
.car-item .form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 1rem;
}
.car-item .form-group label {
  font-weight: 600;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
}
.car-item .form-group input {
  width: 8rem;
  text-align: left;
  padding: 0.5rem;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
}
.update-handler {
  height: 3rem;
  width: 3rem;
  background-color: #2aa745;
  color: #fff;
  transition: 0.25s;
  padding: 0.5rem;
}
.update-handler:hover {
  transform: scale(1.05);
}
.update-handler[disabled] {
  background-color: rgba(201, 201, 201, 0.5);
  cursor: auto;
}
.update-handler[disabled]:hover {
  transform: none;
}
@media screen and (max-width: 900px) {
  .car-item {
    margin: 1rem 0;
    width: 20rem;
    border: none;
    flex-direction: column;
  }
  .car-item .delete-icon {
    width: 2rem;
    height: 2rem;
    left: auto;
    top: -1rem;
    right: -1rem;
  }
  .update-handler {
    margin: 1rem auto;
  }
  .car-item .form-group label {
    margin: 0.5rem auto;
  }
  .car-item .form-group input {
    text-align: center;
  }
}
</style>
