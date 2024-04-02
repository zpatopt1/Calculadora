const express = require('express');
const cors = require('cors');
const gatewayRoutes = require('./apis/gateway/gateway');
const historicoRoutes = require('./apis/historico/historico');
const resultadosRoutes = require('./apis/resultado/resultados');
const { PublicClientApplication } = require('@azure/msal-node');

const app = express();


const pca = new PublicClientApplication(msalConfig);

// Define a rota para iniciar o fluxo de autenticação
app.get('/login', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ['user.read'],
        redirectUri: 'http://localhost:3000/callback', // URI de redirecionamento registrado no portal do Azure AD
    };

    // Inicie o fluxo de autorização usando o Authorization Code Flow
    pca.getAuthCodeUrl(authCodeUrlParameters)
        .then((response) => {
            res.redirect(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Erro ao iniciar o fluxo de autenticação');
        });
});

// Rota de redirecionamento após a autenticação
app.get('/callback', async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        redirectUri: 'http://localhost:3000/callback', // URI de redirecionamento registrado no portal do Azure AD
        scopes: ['user.read'],
    };

    try {
        // Troca o código de autorização por um token de acesso
        const response = await pca.acquireTokenByCode(tokenRequest);
        console.log('Token adquirido:', response.accessToken);
        res.send('Token adquirido com sucesso!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao adquirir o token');
    }
});

// Habilita o CORS
app.use(cors());
app.use(express.json());

// Use as rotas das APIs
app.use(gatewayRoutes);
app.use(historicoRoutes);
app.use(resultadosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
