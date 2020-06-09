<template>
     <div class="tabla-empleados">
          <table class="table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Responsable</th>
                <th>Codigo Presupuestal</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              </thead>
            <tbody>
              <tr v-for="solicitud in solicitud" :key="solicitud.id_solicitud">
                <td>{{solicitud.id_solicitud}}</td>
                <td>{{solicitud.fecha}}</td>
                <td>{{solicitud.nombreEmpleado}}</td>
                <td>{{solicitud.codigo_presupuestal}}</td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ShowArticulos" @click="obtenerItemSolicitudes(solicitud.id_solicitud)">Articulos</button></td>
                <td><button type="button" class="btn btn-success" @click="crearOrden(solicitud.id_solicitud)">Crear Orden Compra<i class="fa fa-plus" aria-hidden="true"></i></button></td>
                <td><button type="button" class="btn btn-danger" @click="borrarSolicitud(solicitud.id_solicitud)"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
              </tr>
            </tbody>
          </table>
          <!-- Modal -->
<div class="modal fade" id="ShowArticulos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Articulos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="tabla-empleados">
          <table class="table">
              <thead>
              <tr>
                <th>Tipo Bien</th>
                <th>Nombre</th>
                <th>U.M</th>
                <th>P.U</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in item" :key="item.id_solicitud">
                <td>{{item.tipoBien}}</td>
                <td>{{item.nombre}}</td>
                <td>{{item.unidadMedida}}</td>
                <td>{{item.precioUnitario}}</td>
                <td>{{item.cantidad}}</td>
                <td>{{item.precioTotal}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
import Solicitud from '../modelos/solicitud'
import Itemsolicitud from '../modelos/itemsolicitud'
import axios from 'axios'
import {global} from '../global'
export default {
  name: 'TablaSolicitudes',
  mounted () {
  this.obtenerSolicitudes()
  this.$forceUpdate()
  },
  data () {
    return {
      url: global.url,
      solicitud: new Solicitud('', '', '', ''),
      item: new Itemsolicitud('', '', '', '', '', '', '', ''),
    }
  },
  methods: {
    obtenerSolicitudes () {
      console.log('obteneindo solicitudes')
      axios.get(this.url + 'api/solicitudes').then(res => {
        console.log(res.status)
        if (res.status === 200) {
          this.solicitud = res.data.sol
          console.log(this.solicitud)
        }
      })
    },
    obtenerItemSolicitudes (id_solicitud) {
      console.log('obteneindo Items')
      console.log(id_solicitud)
      axios.get(this.url + 'api/items_solicitud/' + id_solicitud).then(res => {
        console.log(res.status)
        if (res.status === 200) {
          this.item = res.data.is
          console.log(this.item)
        }
      })
    },
    crearOrden (id_solicitud) {
      console.log(id_solicitud)
      this.$router.push('crearorden/' + id_solicitud)
    },
    borrarSolicitud (id_solicitud) {
      axios.delete(this.url + 'api/delsolicitud/' + id_solicitud).then(res =>{
        console.log(res)
        swal(
          'Solicitud Eliminada',
          'El articulo se ha borrado correctamente',
          'success'
        )
        this.$router.push('/compras')
      })
    }
  }
}
</script>
