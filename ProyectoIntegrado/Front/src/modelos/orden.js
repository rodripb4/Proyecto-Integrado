class Orden {
  constructor (id_solicitud, codigo_presupuestal, nit, proveedor, fecha_orden, monto_total, fecha_entrega) {
    this.id_solicitud = id_solicitud
    this.codigo_presupuestal = codigo_presupuestal
    this.nit = nit
    this.proveedor = proveedor
    this.fecha_entrega = fecha_entrega
    this.monto_total = monto_total
    this.fecha_orden = fecha_orden
  }
}
export default Orden
