# TCP

    identifier: 0x1b43b70b
    camel: tcp
    status: experimental

Data transfer over TCP/IP and TLS stream sockets.

## Commands

    command open @ 0x80 {
        inbound: pipe
    }
    report {
        outbound_port: pipe_port
    }

Open pair of pipes between network peripheral and a controlling device. In/outbound refers to direction from/to internet.

## Pipes

    meta pipe command open_ssl @ 0x01 {
        tcp_port: u16
        hostname: string
    }

Open an SSL connection to a given host:port pair. Can be issued only once on given pipe.
After the connection is established, an empty data report is sent.
Connection is closed by closing the pipe.

    pipe command outdata {
        data: bytes
    }

Bytes to be sent directly over an established TCP or SSL connection.

    pipe report indata {
        data: bytes
    }

Bytes read directly from directly over an established TCP or SSL connection.

    enum TcpError : i32 {
        InvalidCommand = 1
        InvalidCommandPayload = 2
    }
    meta pipe report error @ 0x00 {
        error: TcpError
    }

Reported when an error is encountered. Negative error codes come directly from the SSL implementation.
