import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // A configuração base resolve o problema de caminho dos arquivos
    base: "/controle-operacional-gpsvista/", 
  },
});