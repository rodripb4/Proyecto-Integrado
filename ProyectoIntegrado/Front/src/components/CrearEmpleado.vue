<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h2 class="margin">Añadir Empelado</h2>
        <form v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="dni">DNI</label>
            <input class="form-control" type="text" name="dni" v-model="empleados.dniEmpleados" />
          </div>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input class="form-control" type="text" name="nombre" v-model="empleados.nombreEmpleado" />
          </div>
          <div class="form-group">
            <label for="departamento">Departamento</label>
            <!--<input class="form-control" type="number" name="departamento" v-model="empleados.idDepartamento" />-->
            <select class="form-control" name="idDeperatamento" id="exampleFormControlSelect1" v-model="empleados.idDepartamento">
              <option value="1">Contabilidad</option>
              <option value="2">Compras</option>
              <option value="3">Almacen</option>
              <option value="4">Inventario</option>
            </select>
          </div>
         <div class="form-group">
            <label for="cargo">Cargo</label>
            <input class="form-control" type="text" name="cargo" v-model="empleados.cargoEmpleado" />
          </div>
          <div class="form-group">
            <label for="codigo">Codigo</label>
            <input class="form-control" type="text" name="codigo" v-model="empleados.codEmpleado" />
          </div>
            <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="text" name="email" v-model="empleados.email" />
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
import Empleados from '../modelos/empleados'
import axios from 'axios'
import swal from 'sweetalert'
export default {
  name: 'CrearEmpleado',
  data () {
    return {
      url: global.url,
      empleados: new Empleados('', '', '', '', '', '', '')
    }
  },
  mounted () {

  },
  methods: {
    save () {
      return axios({
        method: 'POST',
        url: this.url + 'empleados',
        data: this.empleados
      })
        .then(response => response.data)
        .then(data => {
          console.log(data)
          console.log(status)
          if (data.status !== 'error') {
            localStorage.setItem('token', data.token)
            swal(
              'Cliente Creado',
              'el Cliente se ha creado correctamente :)',
              'success'
            )
            setTimeout(() => {
              this.$router.push('/Empleados')
            }, 1500)
          } else {
            swal(
              'Direccion Existente',
              'Esa direccion ya existe prueba con otra ',
              'error'
            )
          }
        }).catch(err => {
          console.log(err + 'Ese usuario no existe')
        })
    }
  }
}
</script>
