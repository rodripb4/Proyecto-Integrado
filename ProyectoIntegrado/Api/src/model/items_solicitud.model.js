module.exports = (sequelize, Sequelize) => {
    const ItemsSolicitud = sequelize.define('v_items_solicitudes', {
      idBienes: {
        type: Sequelize.INTEGER
      },
      codTipoBien: {
        type: Sequelize.DATE
      },
      nombre: {
        type: Sequelize.STRING
      },
      unidadMedida: {
        type: Sequelize.STRING
      },
      precioUnitario:{
          type:Sequelize.FLOAT
      },
      id_solicitud:{
          type:Sequelize.INTEGER
      },
      cantidad:{
          type:Sequelize.INTEGER
      },
      tipoBien:{
          type:Sequelize.STRING
      },
      precioTotal:{
          type:Sequelize.FLOAT
      }


    });
    
    return ItemsSolicitud;
  }