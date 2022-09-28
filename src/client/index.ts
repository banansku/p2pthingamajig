import * as net from 'net';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
    prompt: ''
});

function host() {
    const hostPort = process.argv[3]; // TODO checking
    const server = net.createServer(function (socket) {
        socket.on('data', function(data) {
            console.log('friend:', data.toString());
        });

        socket.on('close', function() {
            console.log('Friend ended conversation');
            process.exit(0);
        });

        rl.on('line', function(line) {
            socket.write(line);
        });
    })

    server.on('connection', function() {
        console.log('Connected to friend');
    })

    server.listen(hostPort);
}

function client() {
    const client = new net.Socket();
    const targetPort = process.argv[3]; // TODO checking

    client.connect(+targetPort, '127.0.0.1', function() {
        console.log('Connected to friend');
    });

    client.on('data', function(data) {
        console.log('friend:', data.toString());
    });

    client.on('close', function() {
        console.log('Friend ended conversation');
        process.exit(0);
    })

    rl.on('line', function(line) {
        client.write(line);
    });
}

const clientType = process.argv[2];

if (clientType == 'host') {
    host();
} else if (clientType == 'client') {
    client();
} else {
    console.log('invalid client type');
}
