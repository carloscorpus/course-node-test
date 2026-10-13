import { Server } from './presentation/index.js';
// !! test 2
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
