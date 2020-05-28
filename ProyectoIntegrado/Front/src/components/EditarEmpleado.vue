<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Editar Empleado</h1>
        <form class="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model="empleados.nombreEmpleado" />
          </div>
          <div class="form-group">
            <label for="idDep">Codigo Departamento</label>
            <input type="number" name="idDep" v-model="empleados.idDepartamento" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" name="email" v-model="empleados.email" />
          </div>
     <div class="form-group">
            <label for="cargo">Cargo</label>
            <input type="text" name="cargo" v-model="empleados.cargoEmpleado" />
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
    return {
      url: global.url,
      empleado: new Empleado('', '', '', '', '', '', '', ''),
      empleados: new Empleado('', '', '', '', '', '', '', ''),
      isEdit: true
    }
  },
  mounted () {
    this.idEmpleado = this.$route.params.id
    console.log(this.idEmpleado)
    this.obetenerEmpleado(this.idEmpleado)
  },
  methods: {
    save () {
      var idEmpleado = this.$route.params.id
      axios
        .put(this.url + 'empleados/' + idEmpleado, this.empleado)
        .then(res => {
          if (res.status === 'success') {
            swal(
              'Edición finalizada',
              'El articulo se ha editado correctamente :)',
              'success'
            )
            this.$router.push('/Empleados')
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
      axios.get()
    }
  }
}
</script>
