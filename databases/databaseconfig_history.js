const config = {
    user: 'CloudSA6c43821a',
    password: 'Yaquim123*',
    server: 'history.database.windows.net',
    database: 'history',
    options: {
      encrypt: true, // Se estiver usando Azure, é necessário criptografar
      trustServerCertificate: false // Se estiver usando Azure, não confie automaticamente no certificado do servidor
    }
  };

module.exports = config;