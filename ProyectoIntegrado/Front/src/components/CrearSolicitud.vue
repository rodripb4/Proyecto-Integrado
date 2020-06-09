/* eslint-disable */
<template>
    <div class="general">
      <div>
        <Header></Header>
      </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col" v-if="showCS">
    <div class="center">
      <section class="content">
        <form>
        <h2 class="margin">Crear Solicitud</h2>
        <br>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ShowResponsables" @click="getResponsables()">Seleccionar Responsable</button>
        <br>
        <br>
        <div class="form-group">
        <label for="dni">Responsable</label>
            <input class="form-control" type="text" name="nombre" v-model="resp_selec.nombreEmpleado" />
          </div>
          <div class="form-group">
            <label for="dni">Codigo presupuestal</label>
            <input class="form-control" type="text" name="nombre" v-model="resp_selec.cod_presup"/>
          </div>
        </form>
        <button @click="guardar()" class="btn btn-success">Guardar</button>
      </section>
    </div>
                </div>
                <div class="col" v-if="show">
                    <ItemsSolicitud :id_solicitud ="id_solicitud"></ItemsSolicitud>
                </div>
            </div>
        </div>
    <div class="clearfix"></div>
    <!--Modal-->
    <div class="modal fade" id="ShowResponsables" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Responsables</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="tabla-empleados">
          <table class="table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cod Empleado</th>
                <th>Departamento</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="resp in resp" :key="resp.idEmpleado">
                <td>{{resp.idEmpleado}}</td>
                <td>{{resp.nombreEmpleado}}</td>
                <td>{{resp.codEmpleado}}</td>
                <td>{{resp.nombreDepartamento}}</td>
                 <button type="button" class="btn btn-primary" data-dismiss="modal" @click="seleccionarResponsable(resp)">Seleccionar</button>
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
import ItemsSolicitud from './ItemsSolicitud.vue'
import Header from './Header.vue'
import axios from 'axios'
import {global} from '../global'
import Responsable from '../modelos/responsables'
export default {
    name:'CrearSolicitud',
    components:{
        ItemsSolicitud,
        Header
    },
    data(){
        return{
            showCS: true,
            show: false,
            url: global.url,
            resp: new Responsable('', '', '', '', '', '', '', ''),
            resp_selec:new Responsable('', '', '', '', '', '', '', ''),
            id_solicitud:0
        }

    },
    methods: {
        guardar(){
            this.show = true
            this.showCS = false
            axios.post(this.url + 'api/solicitud',{responsable:this.resp_selec.idEmpleado,cod_presup:this.resp_selec.cod_presup}).then((id_sol)=>{
              console.log(id_sol.data)
              this.id_solicitud = id_sol.data.id_solicitud
              console.log(this.id_solicitud)
            })
        },
        getResponsables(){
          axios.get(this.url + 'api/responsables').then((res)=>{
          if (res.status === 200) {
          this.resp = res.data.resp
          console.log(this.resp)
        }
        console.log(res.status)
        })
        },
        seleccionarResponsable(resp)
        {
            this.resp_selec = resp
        }
    }
}
</script>
