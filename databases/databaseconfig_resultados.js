const config = {
    user: 'CloudSAb5d6008f',
    password: 'Yaquim123*',
    server: 'resultados.database.windows.net',
    database: 'resultados',
    options: {
      encrypt: true, // Se estiver usando Azure, é necessário criptografar
      trustServerCertificate: false // Se estiver usando Azure, não confie automaticamente no certificado do servidor
    }
  };

  
module.exports = config;