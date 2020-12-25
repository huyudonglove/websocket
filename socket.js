var Server=require('ws').Server;
// 定义websocket服务器
const wsServer = new Server({ port: 8085 });

// 定义连接到的websocket集合
let socketSet = new Set();

// 连接
wsServer.on('connection', websocket => {
    console.log(websocket)
    socketSet.add(websocket)
});

// 初始化消息数
let message = 0;

// 定时2s发送消息
setInterval(() => {
    socketSet.forEach(ws => {        
        if (ws.readyState == 1) {
            ws.send(JSON.stringify({
                message: message++
            }))
        } else {
            socketSet.delete(ws);
        }
    })
}, 2000);
