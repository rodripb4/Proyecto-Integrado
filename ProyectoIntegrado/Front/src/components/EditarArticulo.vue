/* eslint-disable */
<template>
  <div class="general">
    <div class="center">
      <section class="content">
        <h2 class="margin">Editar Articulo</h2>
        <form  v-on:submit.prevent="save()">
            <div class="form-group">
            <label for="nombre">Nombre</label>
            <input class="form-control" type="text" name="nombre" v-model="articulo[0].nombre" />
          </div>
         <div class="form-group">
            <label for="departamento">Tipo Bien</label>
            <select class="form-control" name="Tipo Bien" id="exampleFormControlSelect1" v-model="articulo[0].codTipoBien">
              <option value="1">Suministro</option>
              <option value="2">Inmueble</option>
            </select>
          </div>
          <div class="form-group">
            <label for="codigo">Unidad Medida</label>
            <input class="form-control" type="text" name="Unidad Medida" v-model="articulo[0].unidadMedida" />
          </div>
          <div class="form-group">
            <label for="email">Precio Unitario</label>
            <input class="form-control" type="text" name="Precio Unitario" v-model="articulo[0].precioUnitario" />
          </div>
      <div>
      <div>
      <button @click="save()" class="btn btn-success">Guardar</button>
      </div>
      </div>
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
  name: 'EditarArticulo',
  data () {
    var idBienes = this.$route.params.idBienes
    return {
      url: global.url,
      articulo: new Articulo('', '', '', '', '', '', ''),
      isEdit: true
    }
  },
  mounted () {
    console.log(this.$route.params.idBienes)
    this.obetenerArticulo(this.$route.params.idBienes)
  },
  methods: {
    save () {
      var idBienes = this.$route.params.idBienes
      console.log(this.articulo[0])
      axios
        .put(this.url + 'api/editArticulo/' + idBienes, this.articulo[0])
        .then(res => {
          console.log(res.status)
          if (res.status === 200) {
            swal(
              'Edición finalizada',
              'El articulo se ha editado correctamente :)',
              'success'
            )
            this.$router.push('/articulos')
          } else {
            swal(
              'Edición fallida',
              'El articulo no se ha editado bien :(',
              'error'
            )
          }
        })
        .catch(error => {
          console.log(error + '22')
        })
    },
    obetenerArticulo (idBienes) {
      console.log('estoy obteniendo articulos')
      axios.get(this.url + 'api/articulo/' + idBienes).then(res => {
        if (res.status === 200) {
          this.articulo = res.data
          console.log(this.articulo[0])
        }
        console.log(res.status)
      })
    }
  }
}
</script>
