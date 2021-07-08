<template>
  <nav>
    <div class="menu-burger" v-on:click="displayHandler">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul v-bind:class="{ active: active }">
      <li>
        <router-link
          :to="{
            name: 'mes-infos',
            params: { iduser: iduser },
          }"
          >Mes infos</router-link
        >
      </li>
      <li>
        <router-link
          :to="{
            name: 'mes-voitures',
            params: { iduser: iduser },
          }"
          >Mes voitures</router-link
        >
      </li>
      <li>
        <button v-on:click="logoutHandler" aria-label="Déconnexion">
          <font-awesome-icon icon="sign-out-alt" size="1x" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavAdmin",
  data() {
    return {
      iduser: this.$route.params.iduser,
      active: false,
    };
  },
  methods: {
    displayHandler() {
      this.active = !this.active;
    },
    logoutHandler() {
      localStorage.removeItem("token");
      this.$router.push({ name: "connexion" });
    },
  },
  mounted() {},
};
</script>

<style scoped>
nav {
  position: absolute;
  top: 0;
  right: 0;
  height: 5rem;
  width: auto;
  background-color: #fff;
  z-index: 10;
}
nav .menu-burger {
  width: 4rem;
  height: 5rem;
  cursor: pointer;
  display: none;
  z-index: 10;
}
nav .menu-burger span {
  display: block;
  height: 3px;
  width: 2rem;
  background-color: #000;
  margin: 0.25rem 0;
}
nav ul,
nav ul.active {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
}
nav ul li {
  display: block;
  list-style-type: none;
  cursor: pointer;
  transition: 0.25s;
}
nav ul li a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  min-width: 8rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #2c3f50;
  transition: 0.15s;
  position: relative;
}
nav ul li button {
  height: 5rem;
  width: 3rem;
  color: #000000;
  background-color: rgba(211, 211, 211, 0.171);
  transition: 0.25s;
}
nav ul li button:hover {
  background-color: rgba(211, 211, 211, 0.521);
}
nav li a:hover,
nav li a.router-link-active,
nav li a.router-link-exact-active {
  background-color: #f8c146;
  color: #fff;
}
nav li a.router-link-active::after,
nav li a.router-link-exact-active::after {
  content: "";
  height: 1px;
  width: 8rem;
  background-color: #f8c146;
  position: absolute;
  bottom: -0.5rem;
}

@media screen and (max-width: 900px) {
  nav .menu-burger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0rem;
    right: 0rem;
  }
  nav ul {
    flex-direction: column;
    position: fixed;
    top: 7.5rem;
    right: 2rem;
    width: 10rem;
    transform: translateX(15rem);
    transition: 0.25s;
  }
  nav ul.active {
    transform: translateX(0rem);
  }
  nav ul li {
    height: 3rem;
    width: 10rem;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  nav ul li a {
    height: 3rem;
    width: 10rem;
    border: 1px solid rgba(160, 160, 160, 0.288);
    border-bottom: none;
  }
  nav li a.router-link-active,
  nav li a.router-link-exact-active {
    border-color: #f8c146;
  }
  nav li a.router-link-active::after,
  nav li a.router-link-exact-active::after {
    content: "";
    display: none;
  }
  nav ul li button {
    height: 3rem;
    width: 10rem;
    border: 1px solid rgba(160, 160, 160, 0.288);
    border-bottom: 1px solid rgba(160, 160, 160, 0.288);
  }
}
</style>
