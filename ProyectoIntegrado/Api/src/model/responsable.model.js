module.exports = (sequelize, Sequelize) => {
    const Responsable = sequelize.define('responsables', {
      idEmpleado: {
        type: Sequelize.INTEGER
      },
      dniEmpleados: {
        type: Sequelize.STRING
      },
      nombreEmpleado: {
        type: Sequelize.STRING
      },
      codEmpleado: {
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING
      },
      nombreDepartamento:{
        type: Sequelize.STRING
      }
    });
    
    return Responsable;
  }