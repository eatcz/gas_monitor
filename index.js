const express = require('express')
const ws = require('ws')
const url = `wss://mempool.space/api/v1/ws`
const wss = new ws(url)
const app = express()

let mempool = ''

wss.onopen = () => {
    // console.log('WebSocket connected');
    wss.send(JSON.stringify({ action: 'init' }))
    wss.send(JSON.stringify({
        "action": "want",
        "data": [
            "blocks",
            "stats",
            "mempool-blocks",
            "live-2h-chart"
        ]
    }))
    wss.send(JSON.stringify({
        "track-rbf-summary": true
    }))
    wss.send(JSON.stringify({
        "track-mempool-block": 0
    }))
};

wss.onmessage = (event) => {
    // console.log('Received message:', event.data);
    mempool = event.data
    // 处理接收到的消息
};

app.get('/', (req, res) => {
    res.send('自用BTC Gas监控,接口地址:/api/gas')
})

app.get('/api/gas', (req, res) => {
    res.send(mempool)
})


app.listen('8888', () => {
    console.log('start')
})

module.exports = app;