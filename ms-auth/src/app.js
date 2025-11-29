// ms-auth/src/app.js

const express = require('express');
const config = require('./config');
const authRouter = require('./api/routes/auth.routes'); // Importa el enrutador
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();

app.use(express.json());

// Aquí se usa la variable 'authRouter'. Si el archivo importado no exporta
// una función, aquí es donde Express falla.
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`MS_Auth escuchando en el puerto ${config.port}`);
});

// --- INICIO CÓDIGO PROMETHEUS ---
const promBundle = require("express-prom-bundle");
// Configura el middleware para capturar métricas HTTP automáticas
const metricsMiddleware = promBundle({
  includeMethod: true, 
  includePath: true, 
  includeStatusCode: true, 
  includeUp: true,
  promClient: {
    collectDefaultMetrics: {
    }
  }
});
app.use(metricsMiddleware);
// --- FIN CÓDIGO PROMETHEUS ---