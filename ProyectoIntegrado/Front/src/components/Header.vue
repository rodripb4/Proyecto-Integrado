<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="">Empleados<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Compras</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" role="button" @click="salir()">Sign Out</a>
      </li>
    </ul>
  </div>
</nav>
</template>
<script>
export default {
  name: 'Header',
  methods :{
  salir(){
    localStorage.clear()
    this.$router.push('/')
  }
 }
}
</script>
