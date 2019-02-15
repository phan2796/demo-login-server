if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'codeworkrauthentication',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      },
    },
  };
} else {
  module.exports = {
    JWT_SECRET: 'test',
    oauth: {
      google: {
        clientID: '91674211488-58dfdofts394fq998i9091s9dgg142ut.apps.googleusercontent.com',
        clientSecret: '98fWydws-4XGh11i0x7NC9vC',
      },
      facebook: {
        clientID: '338252833445705',
        clientSecret: 'c26418e9c57bf813fc5f33c89d5c1a20',
      },
    },
  };
}