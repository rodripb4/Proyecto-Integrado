<template>
<div class="container">
    <h2 class="margin">Crear Orden Compra</h2>
    <div class="row">
        <div class="col-6">
        <form>
          <div class="form-group">
            <label for="nc">Numero contractual</label>
            <input class="form-control" type="text" name="nc" v-model="orden[0].codigo_presupuestal" />
          </div>
          <div class="form-group">
            <label for="nit">NIT</label>
            <input class="form-control" type="text" name="nit" v-model="orden.nit" />
          </div>
          <div class="form-group">
            <label for="nombre">Proveedor</label>
            <input class="form-control" type="text" name="nombre" v-model="orden.proveedor" />
          </div>
         <div class="form-group">
            <label for="mt">Monto Total</label>
            <input class="form-control" type="number" name="mt" v-model="montoTotal" @click="obtenerMontoTotal()" readonly />
          </div>
          <div class="form-group">
            <label for="fe">Fecha Entrega</label>
            <input class="form-control" type="date" name="fe" v-model="orden.fecha_entrega" />
          </div>
        </form>
        </div>
        <div class="col-6">
         <div class="tabla-empleados">
          <table class="table">
              <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Unidad Medida</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Precio Total</th>
              </tr>
              </thead>
            <tbody>
              <tr v-for="item in item" :key="item.idBienes">
                <td>{{item.nombre}}</td>
                <td>{{item.cantidad}}</td>
                <td>{{item.unidadMedida}}</td>
                <td>{{item.precioUnitario}}</td>
                <td>{{item.precioTotal}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
    </div>
    <button type="button" class="btn btn-success" @click="descargarPDF()">Generar Orden</button>
    <div class="clearfix"></div>
  </div>
</template>
<script src="js/jquery.min.js"></script>
<script src="jspdf.min.js"></script>
<script src="jspdf.plugin.autotable.min.js"></script>
<!-- jsPDF library -->
<script src="js/jsPDF/dist/jspdf.min.js"></script>
<script>
import axios from "axios"
import { global } from "../global"
import jsPDF from 'jspdf'
import jsPDFAutotable from 'jspdf-autotable'
import Orden from '../modelos/orden'
import Itemsolicitud from '../modelos/itemsolicitud'
export default {
    name: 'crearorden',
    components: {
        jsPDFAutotable
    },
    mounted (){
        console.log(this.$route.params.id_solicitud)
        this.obtenerItemSolicitudes(this.$route.params.id_solicitud)
        this.obtenerSolicitud(this.$route.params.id_solicitud)
    },
    data (){
        return{
            url: global.url,
            orden: new Orden('', '', '', '', '', '', ''),
            item: new Itemsolicitud('', '', '', '', '', '', '', ''),
            montoTotal: 0
        }
    },
    methods: {
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
    obtenerSolicitud (id_solicitud){
         console.log('Obeteniendo Solicitud')
         axios.get(this.url + 'api/solicitud/' + id_solicitud).then(res => {
             console.log(res.status)
             if (res.status === 200) {
                 this.orden = res.data
                 console.log(this.sol)
             }
         })
    },
    obtenerMontoTotal(){
        console.log('estoy obteniendo monto')
        console.log(this.item)
        var sum = 0
        this.montoTotal = 0
        for (let i = 0; i < this.item.length; i++) {
            sum = sum + (this.montoTotal + this.item[i].precioTotal)
        }
        this.montoTotal=sum
        console.log(this.montoTotal)
        return this.montoTotal
    },
    descargarPDF(){
    var hoy = new Date();
    var fecha= hoy.getDate()+'/'+(hoy.getMonth()+1)+'/'+hoy.getFullYear();
    console.log(fecha)
    var doc = new jsPDF();
    var columnsProv = ["PROVEEDOR"];
    var rowsProv = [];
    var nitProv = ["Nit: " + this.orden.nit];
    var nombreProv = ["Nombre: " + this.orden.proveedor];
    var fe = ["Fecha de enterga: " + this.orden.fecha_entrega];
    rowsProv.push(nitProv);
    rowsProv.push(nombreProv);
    rowsProv.push(fe);
    var columns = ["NOMBRE", "PRECIO UNITARIO", "CANT", "PRECIO TOTAL"];
    var rows = [];
    this.item.forEach(element =>{
    var temp = [element.nombre,element.precioUnitario,element.cantidad,element.precioTotal];
    rows.push(temp);
    }); 
        var temp03 = [" "," "," ","Total : " + this.montoTotal];
        rows.push(temp03);
var doc = new jsPDF('p', 'pt');
doc.autoTable(columnsProv, rowsProv, {
    styles: {
        theme: "plain"
    },
    margin: {
        top: 100
    }
});
doc.autoTable(columns, rows,{ 
            margin: {
                top: 500
            },
        });
doc.setFontSize(16);
doc.text(40, 60, 'EDUDAM S.L');
doc.setTextColor(34, 96, 219);
doc.setFontSize(22);
doc.text(350, 60, 'ORDEN DE COMPRA');
doc.setFontSize(11);
doc.setTextColor(0,0,0);
doc.text(485, 90, 'Fecha: ' + fecha);
doc.save(this.orden[0].codigo_presupuestal+'_orden.pdf');

this.$router.push('/compras');
    }
    }
}
</script>
