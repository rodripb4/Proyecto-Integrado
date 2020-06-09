/* eslint-disable */
<template>
<div>
  <div>
    <Header></Header>
  </div>
  <div>
    <section class="content">
  <br>
  <br>
  <h2 class="subheader">Compras</h2>
  <br>
  <br>
    <div class="container">
    <div class="row">
      <div class="col 6">
        <router-link to="/crearsolicitud" class="btn btn-success">Solicitud Compra<i class="fa fa-plus" aria-hidden="true"></i></router-link>
      </div>
    </div>
  </div>
  <br>
  <br>
  <TablaSolicitudes></TablaSolicitudes>
  </section>
</div>
</div>
</template>
<script>
import Header from './Header.vue'
import TablaSolicitudes from './TablaSolicitudes.vue'
export default {
  name: 'compras',
  components: {
    Header,
    TablaSolicitudes
  }
}
</script>
