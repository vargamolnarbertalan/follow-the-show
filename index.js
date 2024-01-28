const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const WebSocket = require('ws')
const app = express()

const port = 13135

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const server = http.createServer(app)
const wss = new WebSocket.Server({ port: 13136 })

var lastMSG

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        //console.log(message.toString())
        if(message.toString() == 'LOADED'){
            wss.clients.forEach((client) => {
                client.send(lastMSG)
            })
        }
        // Broadcast the received message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                var object = message.toString()
                    //console.log(object)
                    lastMSG = object
                client.send(object)
            }
        })
    })
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/follow', (req, res) => {
    res.render('output')
})

app.get('/hidenext', (req, res) => {

    wss.clients.forEach((client) => {
        // Send a message to all connected WebSocket clients
        client.send('HIDENEXT')
      })
    
      res.send('DONE')

})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

