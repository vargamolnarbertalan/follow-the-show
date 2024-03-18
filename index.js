const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const PORT = process.env.PORT || 443

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


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

app.get('/edit', (req, res) => {
    res.render('index')
})

app.get('/follow', (req, res) => {
    const ejsdata = {
        hidecount: globalHideCount
    }
    res.render('output', { ejsdata })
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

app.get('*', async(req, res) => {
    res.redirect('/follow')
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })