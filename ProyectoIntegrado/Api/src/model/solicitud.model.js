module.exports = (sequelize, Sequelize) => {
    const Solicitudes = sequelize.define('v_solicitudes', {
      id_solicitud: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      nombreEmpleado: {
        type: Sequelize.STRING
      },
      codigo_presupuestal: {
        type: Sequelize.STRING
      }
    });
    
    return Solicitudes;
  }