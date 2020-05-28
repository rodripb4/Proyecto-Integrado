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
        <h2 class="subheader">Empleados</h2>
        <br />
        <div id="left">
         <router-link to="/crearempleado" class="btn btn-success">Añadir Empleado</router-link>
         </div>
        <br />
        <br />
        <br />
        <div class="tabla-empleados">
          <table class="table">
              <thead>
              <tr>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Departamento</th>
                <th scope="col">Cargo</th>
                <th scope="col">CodEmpleado</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
              </thead>
            <tbody>
              <tr v-for="empleado in empleado" :key="empleado.idEmpleado">
                <td>{{empleado.dniEmpleados}}</td>
                <td>{{empleado.nombreEmpleado}}</td>
                <td>{{empleado.nombreDepartamento}}</td>
                <td>{{empleado.cargoEmpleado}}</td>
                <td>{{empleado.codEmpleado}}</td>
                <td>{{empleado.email}}</td>
                <td>
                  <button type="button" class="btn btn-outline-primary" @click="editarEmpleado(idEmpleado)">Editar</button>
                </td>
                <td>
                   <button @click="eliminarEmpleado(empleado.idEmpleado)"  type="button" class="btn btn-outline-danger">Eliminar</button>
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
    let token = localStorage.getItem('user-token') || null
    let role = localStorage.getItem('role')||null
    if (token != null) this.obtenerEmpleados()
    else this.$router.push('/')
  },
  data () {
    return {
      url: global.url,
      empleado: new Empleado('', '', '', '', '', '', '')
    }
  },
  methods: {
    obtenerEmpleados () {
      axios.get(this.url + 'empleados').then(res => {
        if (res.status === 200) {
          this.empleado = res.data
          console.log(this.empleado)
        }
        console.log(res.status)
      })
    },
    editarEmpleado (idEmpleado) {
      
      console.log(this.empleado.idEmpleado)
      this.router.push('editarempleado/' + idEmpleado)
    },
    eliminarEmpleado (idEmpleado) {
      console.log(idEmpleado)
      axios.delete(this.url + 'empleados/' + idEmpleado).then(res => {
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
