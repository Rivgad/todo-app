import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import fs from 'fs';
import path from 'path'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    const API_URL = process.env.VITE_API_URL;

    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: API_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            },
            port: 8080,
            https: getCerfAndKey()
        }
    });
}


function getCerfAndKey() {
    const baseFolder = process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

    const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
    const certificateName = certificateArg ? certificateArg.groups.value : "reactapp";

    if (!certificateName) {
        console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.');
        process.exit(-1);
    }

    const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
    const keyFilePath = path.join(baseFolder, `${certificateName}.key`);
    return { key: fs.readFileSync(keyFilePath), cert: fs.readFileSync(certFilePath) };
}

