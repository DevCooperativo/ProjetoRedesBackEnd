# Etapa 1: build da aplicação com Node
FROM node:20-alpine AS builder

WORKDIR /app

# Instala as dependências
COPY package*.json ./
RUN npm install

# Copia os arquivos da aplicação
COPY . .

# Gera o build de produção do Vite
RUN npm run build

# Etapa 2: usar 'serve' para servir os arquivos
FROM node:20-alpine

WORKDIR /app

# Instala o pacote 'serve' globalmente
RUN npm install -g serve

# Copia os arquivos buildados da etapa anterior
COPY --from=builder /app/dist ./dist

# Expõe a porta padrão (pode ser mapeada externamente depois)
EXPOSE 5173

# Comando para servir os arquivos da pasta /dist
CMD ["serve", "-s", "dist", "-l", "5173"]
