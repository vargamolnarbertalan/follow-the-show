const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const WebSocket = require('ws')
const app = express()

const http_port = process.env.PORT || 10000
const wss_port = 13136

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const server = http.createServer(app)
const wss = new WebSocket.Server({ port: wss_port })
console.log(wss)

var lastMSG
var globalHideCount = 2

wss.on('connection', (ws) => {
    ws.send('Initial data')
    ws.send(lastMSG)
    ws.on('message', (message) => {

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                var object = message.toString()
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
        client.send(`HIDENEXT:${globalHideCount}`)

    })
    globalHideCount++
    res.send('DONE')

})

app.get('/hidereset', (req, res) => {
    globalHideCount = 2
    wss.clients.forEach((client) => {
        // Send a message to all connected WebSocket clients
        client.send(`HIDERESET`)

    })

    res.send('RESET DONE')
})

app.listen(http_port, () => {
    console.log(`Server is running at http://localhost:${http_port}`)
})