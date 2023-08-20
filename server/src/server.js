const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const { loadPlanetsData}  = require ('./models/planets.model')
const PORT = process.env.PORT || 8000
async function startserver(){
 await loadPlanetsData()
    server.listen(PORT,()=>{
        console.log(`Listening on ${PORT}...`)
    })
}


startserver()

