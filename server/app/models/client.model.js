module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    cpf: {
      type: Sequelize.STRING
    }
  });

  return Client;
};