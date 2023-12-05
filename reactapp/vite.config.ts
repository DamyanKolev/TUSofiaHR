import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const baseFolder: string =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map((arg: string) => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName: string = certificateArg ? certificateArg.groups.value : "reactapp";

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath: string = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath: string = path.join(baseFolder, `${certificateName}.key`);


//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@models': path.resolve(__dirname, './src/models'),
            '@app-types': path.resolve(__dirname, './src/types')
        },

    },
    server: {
        proxy: {
            //'^/weatherforecast': {
            '/api': {
                target: 'https://localhost:7057',
                secure: false,
                changeOrigin: true,
                //rewrite: (path) => path.replace(/^\/api/, ''),
            }
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})