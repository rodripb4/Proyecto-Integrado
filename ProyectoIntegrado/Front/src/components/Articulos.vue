<template>
<div>
    <Header></Header>
    <div>
    <section id="content">
        <br />
        <br />
        <h2 class="subheader">Articulos</h2>
        <br />
        <div id="left">
         <router-link to="/crearempleado" class="btn btn-success">Añadir Articulo</router-link>
         </div>
        <br />
        <br />
        <br />
        <div class="tabla-empleados">
          <table class="table">
              <thead>
              <tr>
                <th scope="col">Tipo Bien</th>
                <th scope="col">Nombre</th>
                <th scope="col">Unidad Medida</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
              </thead>
            <tbody>
              <tr v-for="articulo in articulo" :key="articulo.idBienes">
                <td>{{articulo.tipoBien}}</td>
                <td>{{articulo.nombre}}</td>
                <td>{{articulo.unidadMedida}}</td>
                <td>{{articulo.precioUnitario}}</td>
                <td>
                  <button type="button" class="btn btn-outline-primary" @click="editarArticulo(articulo.idBienes)">Editar</button>
                </td>
                <td>
                   <button @click="eliminarArticulo(articulo.idBienes)"  type="button" class="btn btn-outline-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      </div>
</div>
</template>
<script>
import Header from './Header.vue'
import axios from 'axios'
import {global} from '../global'
import Articulo from '../modelos/articulos'
import swal from 'sweetalert'
export default {
  name: 'articulos',
  components: {
    Header
  },
  mounted () {
    let token = localStorage.getItem('user-token') || null
    let role = localStorage.getItem('role')||null
    if (token != null) this.obtenerArticulos()
    else this.$router.push('/')
  },
  data () {
    return {
      url: global.url,
      articulo: new Articulo('', '', '', '', '', '')
    }
  },
  methods: {
    obtenerArticulos () {
      axios.get(this.url + 'api/articulos').then(res => {
        if (res.status === 200) {
          this.articulo = res.data
          console.log(this.articulo)
        }
        console.log(res.status)
      })
    },
    editarArticulo (idBienes) {
      console.log(idBienes)
      this.$router.push('editarempleado/' + idBienes)
    },
    eliminarArticulo (idBienes) {
      console.log(idBienes)
      axios.delete(this.url + 'api/delArticulo' + idBienes).then(res => {
        console.log(res)
        this.$router.push('/empleados')
        swal(
          'Empleado Eliminado',
          'El empleado se ha borrado correctamente',
          'success'
        )
      })
    }
  }
}
</script>
