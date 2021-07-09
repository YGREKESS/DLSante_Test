<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$router.push({
      name: "connexion",
    });
  },
};
</script>

<style>
*::-webkit-scrollbar {
  display: none;
}
body {
  margin: 0;
  padding: 0;
}
body * {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input {
  padding: 1rem 0.5rem;
  width: 20rem;
  text-align: center;
  border: 1px solid rgba(128, 128, 128, 0.219);
}
button {
  cursor: pointer;
  border: none;
  transition: 0.25s;
  font: 400 18px Avenir;
  color: #fff;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Form */
.form h2 {
  text-transform: uppercase;
}
.form button {
  width: 20rem;
  padding: 1rem 0.5rem;
  background-color: #f8c146;
}
.form button:hover {
  background-color: #f5b01c;
}

/* Text */
.alert {
  color: red;
  width: 100%;
  margin: 2rem auto;
}
</style>
