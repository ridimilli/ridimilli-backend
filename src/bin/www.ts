import app from '../app';
import * as debug from 'debug';
import { createServer } from 'http';

const port: Number = Number(process.env.PORT) || 3000;

const server = createServer(app);

server.listen(port, () => {
    console.log(`${port}포트 서버 대기 중!`);
});
server.on('error', onError);
server.on('listening', onListening);
process.setMaxListeners(100);

/**
 * Event listner for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    //handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * http 서버 이벤트 리스너
 */

function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

    debug('Listening on ' + bind);
}
export default server;
