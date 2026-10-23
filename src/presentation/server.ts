import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(option: Options) {
        const { port, routes, public_path = 'public' } = option;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    //aca se pudo usar como metodo estatico por que no se hara con indeccion de dependencias!

    async start() {
        //* MIDDELWARES
        this.app.use(express.json());
        //* Public folder
        this.app.use(express.static(this.public_path));

        //* RUTAS
        this.app.use(this.routes);

        // * SPA routing
        this.app.get('/{*splat}', (req, res) => {
            const indexPath = path.join(process.cwd(), this.public_path, 'index.html');
            res.sendFile(indexPath);
            return;
        });

        this.app.listen(this.port, () => {
            console.log('server running Web Service', this.port);
        });
    }
}
