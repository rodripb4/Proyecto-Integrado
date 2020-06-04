<template>
  <div class="general">
    <div class="center">
      <section class="content">
        <h2 class="margin">Editar Empleado</h2>
        <form  v-on:submit.prevent="save()">
           <div class="form-group">
            <label for="dni">DNI</label>
            <input class="form-control" type="text" name="dni" v-model="empleado[0].dniEmpleados" readonly />
          </div>
            <div class="form-group">
            <label for="nombre">Nombre</label>
            <input class="form-control" type="text" name="nombre" v-model="empleado[0].nombreEmpleado" />
          </div>
         <div class="form-group">
            <label for="departamento">Departamento</label>
            <select class="form-control" name="idDeperatamento" id="exampleFormControlSelect1" v-model="empleado[0].idDepartamento">
              <option value="1">Contabilidad</option>
              <option value="2">Compras</option>
              <option value="3">Almacen</option>
              <option value="4">Inventario</option>
            </select>
          </div>
          <div class="form-group">
            <label for="codigo">Cargo</label>
            <input class="form-control" type="text" name="cargo" v-model="empleado[0].cargoEmpleado" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="text" name="email" v-model="empleado[0].email" />
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
import Empleado from '../modelos/empleados'
import axios from 'axios'
import swal from 'sweetalert'
export default {
  name: 'EditarEmpleado',
  data () {
    var idEmpleado = this.$route.params.idEmpleado
    return {
      url: global.url,
      empleado: new Empleado('', '', '', '', '', '', ''),
      isEdit: true,
    }
  },
  mounted () {
    this.$route.params.idEmpleado
    console.log(this.$route.params.idEmpleado)
    this.obetenerEmpleado(this.$route.params.idEmpleado)
  },
  methods: {
    save () {
      var idEmpleado = this.$route.params.idEmpleado
      console.log(this.empleado[0])
      axios
        .put(this.url + 'empleados/' + idEmpleado, this.empleado[0])
        .then(res => {
          console.log("estoy en el then")
          console.log(res.status)
          if (res.status == 200) {
            swal(
              'Edición finalizada',
              'El articulo se ha editado correctamente :)',
              'success'
            )
            this.$router.push('/empleados')
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
    obetenerEmpleado (idEmpleado) {
      console.log('estoy obteniendo empleados')
      axios.get(this.url + 'api/empleado/'+ idEmpleado).then(res => {
        if (res.status === 200) {
          this.empleado = res.data
          console.log(this.empleado[0])
        }
        console.log(res.status)
      })
    }
  }
}
</script>
