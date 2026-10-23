import { Server } from './presentation/server.js';
import { envs } from './config/envs.js';
import { AppRoutes } from './presentation/routes.js';

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}
