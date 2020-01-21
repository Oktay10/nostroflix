const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = require('socket.io')(server);

// socket io
io.on('connection', function (socket) {
    console.log('User connected');

    socket.on('save-film', function (data) {
      console.log(data);
      io.emit('new-film', { film: data });
    });

    socket.on('save-post', function (data) {
      console.log(data);
      io.emit('new-post', { post: data });
    });
    
  });

server.listen(port);