import { Server } from './presentation/index.js';

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: 3000,
        public_path: 'public',
    });
    server.start();
}
