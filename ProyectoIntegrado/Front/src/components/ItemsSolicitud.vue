/* eslint-disable */
<template>
    <div class="general">
    <div class="center">
      <section class="content">
        <form action="">
        <h2 class="margin">Seleccionar Articulo</h2>
        <br>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ShowArticulos" @click="obtenerArticulos()">Mostrar Articulos</button>
            <br>
            <br>
          <div class="form-group">
            <label for="dni">Nombre</label>
            <input class="form-control" type="text" name="nombre" v-model="art_select.nombre" />
          </div>
          <div class="form-group">
            <label for="departamento">Tipo Articulo</label>
            <select class="form-control" name="tipoArticulo" id="exampleFormControlSelect1" v-model="art_select.codTipoBien">
              <option value="1">Suministro</option>
              <option value="2">Inmueble</option>
            </select>
          </div>
         <div class="form-group">
            <label for="cargo">Unidad Medida</label>
            <input class="form-control" type="text" name="uM" v-model="art_select.unidadMedida" />
          </div>
          <div class="form-group">
            <label for="codigo">Precio Unitario</label>
            <input class="form-control" type="number" name="pUni" v-model="art_select.precioUnitario" />
          </div>
           <div class="form-group">
            <label for="codigo">Cantidad</label>
            <input class="form-control" type="number" name="cantidad" v-model="art_select.cantidad" />
          </div>
        </form>
                  <div class="container-fluid">
            <div class="row">
              <div class="col-3">
                <button  @click="guardarysalir()" class="btn btn-success">Guardar y Salir</button>
              </div>
              <div class="col-3">
                <button  @click="guardarycontinuar()" class="btn btn-success">Guardar Articulo</button>
              </div>
            </div>
          </div>
      </section>
    </div>
    <div class="clearfix"></div>
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
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="articulo in articulo" :key="articulo.id_solicitud">
                <td>{{articulo.tipoBien}}</td>
                <td>{{articulo.nombre}}</td>
                <td>{{articulo.unidadMedida}}</td>
                <td>{{articulo.precioUnitario}}</td>
                <td><button type="button" data-dismiss="modal"  class="btn btn-primary"  @click="seleccionarItem(articulo)">Seleccionar</button></td>
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
import axios from 'axios'
import {global} from '../global'
import Articulo from '../modelos/articulos'
import swal from 'sweetalert'
export default {
  name:'ItemsSolicitud',
  data () {
        return{
            url: global.url,
            articulo: new Articulo('', '', '', '', '', '', ''),
            art_select: new Articulo('', '', '', '', '', '', ''),
            id_solicitud: 0
         }
  },
  methods: {
    lastId (){
      axios.get(this.url + 'api/lastsolicitud').then(res =>{
        if(res.status === 200) {
          this.id_solicitud = res.data[0].last_Id
          console.log(this.id_solicitud)
        }else{
          console.log(err);
        }
      })
    },
    guardarycontinuar(){
            axios.post(this.url + 'api/items_solicitud',{id_sol:this.id_solicitud, id_bien:this.art_select.idBienes, qnt:this.art_select.cantidad}).then((res)=>{
              res.data
              console.log(res.data)
              this.art_select = new Articulo()
            })
        },
        guardarysalir(){
            axios.post(this.url + 'api/items_solicitud',{id_sol:this.id_solicitud, id_bien:this.art_select.idBienes, qnt:this.art_select.cantidad}).then((res)=>{
              res.data
              console.log(res.data)
              this.$router.push('/compras')
            })
        },
    obtenerArticulos () {
      axios.get(this.url + 'api/articulos').then(res => {
        if (res.status === 200) {
          this.articulo = res.data
          console.log(this.articulo)
        }
        console.log(res.status)
      })
    },
    seleccionarItem(articulo)
        {
            this.art_select = articulo
            this.lastId()
        }
}
}
</script>
