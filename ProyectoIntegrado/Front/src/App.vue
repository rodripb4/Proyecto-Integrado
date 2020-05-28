/* eslint-disable */
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    route: function currentRouteName () {
      console.log(this.$route.name)
      return this.$route.name
    }
  },
  mounted () {
    this.verificartoken()
  },
  methods: {
    verificartoken () {
      if (localStorage.getItem('user-token') === undefined || localStorage.getItem('user-token') === null) {
        console.log('No hay token')
      } else {
        this.$route.push('/empleados')
      }
    }
  }
}
</script>

<style>
@import "C:\Users\rodri\ProyectoIntegrado\Front\src\assets\css\bootstrap.css";
</style>
