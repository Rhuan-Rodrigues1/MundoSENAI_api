const express = require('express')
const cors = require('cors')
const os = require('os')
const cluster = require('cluster')
const app = express()

const numCPUS = os.cpus().length


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

require('./controllers/apiFocosNormalizedController')(app)
require('./controllers/apiPaisesNormalizedController')(app)
require('./controllers/apiEstadosNormalizedController')(app)
require('./controllers/apiMunicipiosNormalizedControllers')(app)
require('./controllers/apiMainNormalizedControll')(app)

if(cluster.isMaster) {
    console.log("Master process is running")

    for(let i = 0; i < numCPUS; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
      });
} else {
    app.listen('3000', () => {
        console.log('server is running: http://localhost:3000');
    })
}
