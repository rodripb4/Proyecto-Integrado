<template>
  <div class="general">
    <div class="center">
      <section class="content">
        <h2 class="margin">Añadir Articulo</h2>
        <form v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="dni">Nombre</label>
            <input class="form-control" type="text" name="nombre" v-model="articulo.nombre" />
          </div>
          <div class="form-group">
            <label for="departamento">Tipo Articulo</label>
            <select class="form-control" name="tipoArticulo" id="exampleFormControlSelect1" v-model="articulo.codTipo">
              <option value="1">Suministro</option>
              <option value="2">Inmueble</option>
            </select>
          </div>
         <div class="form-group">
            <label for="cargo">Unidad Medida</label>
            <input class="form-control" type="text" name="uM" v-model="articulo.unidadMedida" />
          </div>
          <div class="form-group">
            <label for="codigo">Precio Unitario</label>
            <input class="form-control" type="number" name="pUni" v-model="articulo.precioUnitarioª" />
          </div>
          <input type="submit" value="Guardar" class="btn btn-success" />
        </form>
      </section>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { global } from '../global'
import Articulo from '../modelos/articulos'
import axios from 'axios'
import swal from 'sweetalert'
export default {
  name: 'CrearArticulo',
  data () {
    return {
      url: global.url,
      articulo: new Articulo('', '', '', '', '')
    }
  },
  mounted () {

  },
  methods: {
    save () {
      return axios({
        method: 'POST',
        url: this.url + 'api/postArticulo',
        data: this.articulo
      })
        .then(response => response.data)
        .then(data => {
          console.log(data)
          console.log(status)
          if (data.status !== 'error') {
            swal(
              'Articulo creado',
              'el articulo se ha creado correctamente :)',
              'success'
            )
            setTimeout(() => {
              this.$router.push('/articulos')
            }, 1500)
          } else {
            swal(
              'Error al crear el articulo',
              'error'
            )
          }
        }).catch(err => {
          console.log(err + 'Ese articulo no existe')
        })
    }
  }
}
</script>
