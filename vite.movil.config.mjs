// Servidor de desarrollo para probar en iPhone/iPad por la red local.
// Safari solo da acceso al sensor de inclinación con conexión segura (HTTPS),
// así que se usa un certificado autofirmado local generado con `npm run cert`.
import { existsSync, readFileSync } from 'node:fs';
import { defineConfig, mergeConfig } from 'vite';
import base from './vite.config.ts';

const key = '.cert/key.pem';
const cert = '.cert/cert.pem';
if (!existsSync(key) || !existsSync(cert)) {
  console.error('\n  Falta el certificado local. Ejecuta primero:  npm run cert\n');
  process.exit(1);
}

export default mergeConfig(
  base,
  defineConfig({
    server: { host: true, port: 5180, strictPort: true, https: { key: readFileSync(key), cert: readFileSync(cert) } },
  }),
);
