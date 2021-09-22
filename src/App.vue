<template>
  <div id="app">
    <!--- Navbar --->
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="navbar-nav ml-auto">
      <div class="nav-item pl-1">
      <router-link class="nav-link" to="/"><i class="fa fa-home fa-fw mr-1"></i>Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      </div>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="nvbCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item pl-1">
            <router-link v-if="!isLogin" class="nav-link" to="/login">Login </router-link>
          </li>
          <li class="nav-item pl-1">
            <router-link v-if="!isLogin" class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item pl-1">
            <a v-if="isLogin" class="nav-link" href="" @click.prevent="logout"><i class="fa fa-sign-in fa-fw mr-1"></i>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
    <router-view />
  </div>
</template>

<script>


export default {
  name: `App`,
  computed: {
    isLogin(){
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout(){
      localStorage.clear()
      this.$store.commit(`CHANGE_IS_LOGIN`, false)
      this.$store.commit(`CLEAR_MOVIES`)
      this.$router.push(`/login`)
    }
  }
}
</script>


<style>
html {
  background-color: #dfe6e9;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dfe6e9;
}
.navbar { background-color: #353b48;; }
.navbar .navbar-nav .nav-link { color: #fff; }
.navbar .navbar-nav .nav-link:hover { color: #fbc531; }
.navbar .navbar-nav .active > .nav-link { color: #fbc531; }


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
