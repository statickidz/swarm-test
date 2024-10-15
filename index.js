const express = require('express');
const app = express();
const port = 3000;

const os = require( 'os' );
const networkInterfaces = Object.values(os.networkInterfaces())
    .reduce((r,a) => {
        r = r.concat(a)
        return r;
    }, [])
    .filter(({family, address}) => {
        return family.toLowerCase().indexOf('v4') >= 0 &&
            address !== '127.0.0.1'
    })
    .map(({address}) => address);

const ipAddresses = networkInterfaces.join(', ')

// Generar un identificador único para esta instancia
const instanceId = Math.random().toString(36).substring(7);

// Función para agregar un delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Iniciar con un delay de 5 segundos
(async () => {
  await delay(5000); // Espera 5 segundos

  // Definir las rutas después del delay
  app.get('/', (req, res) => {
    res.send(`Hello from instance ${instanceId} with ip ${ipAddresses}`);
  });

  app.get('/health', (req, res) => {
     res.send(`Hello from instance ${instanceId} with ip ${ipAddresses}`);
  });

  app.listen(port, () => {
    console.log(`App instance ${instanceId} with ip ${ipAddresses} running on port ${port} after 5 seconds delay`);
  });
})();
