<template>
<div>
<div width="100%">
    <Header></Header>
    </div>
    <div>
    <section id="content">
        <br />
        <br />
        <br />
        <br />
        <h2 class="subheader">Departamentos</h2>
        <br />
        <div id="left">
         <router-link to="/Creardepartamento" class="btn btn-success">Añadir Departamento</router-link>
         </div>
        <br />
        <br />
        <br />
        <div class="tabla-empleados">
          <table class="table">
              <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Departamento</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cargo</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
              </thead>
            <tbody>
              <tr v-for="empleado in empleado" :key="empleado._idEmpleado">
                <td>{{empleado.dniEmpleados}}</td>
                <td>{{empleado.nombreEmpleado}}</td>
                <td>{{empleado.nombreDepartamento}}</td>
                <td>{{empleado.cargoEmpleado}}</td>
                <td>{{empleado.codEmpleado}}</td>
                <td>{{empleado.email}}</td>
                <td>
                  <button type="button" class="btn btn-outline-primary" @click="editarEmpleado(empelado._idEmpleado)">Editar</button>
                </td>
                <td>
                   <button @click="eliminarEmpleado(empleado._idEmpleado)"  type="button" class="btn btn-outline-danger">Eliminar</button>
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
import Empleado from '../modelos/empleados'
import swal from 'sweetalert'
export default {
  name: 'Empleados',
  components: {
    Header
  },
  mounted () {
    this.obtenerEmpleados()
  },
  data () {
    return {
      url: global.url,
      empleado: new Empleado('', '', '', '', '', '', ''),
    }
  },
  methods: {
    obtenerEmpleados () {
      this.empleados = axios.get(this.url + 'empleados').then(res => {
        if (res.status === 200) {
          this.empleado = res.data
          console.log(this.empleado)
        }
        console.log(res.status)
      })
    },
    editarEmpleado (idEmpleado) {
      this.$router.push('' + idEmpleado)
    },
    eliminarEmpleado (_idEmpleado) {
      axios.delete(this.url + 'empleados/' + _idEmpleado).then(res => {
        console.log(res)
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