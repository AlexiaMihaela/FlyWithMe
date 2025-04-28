# 1. Build stage
FROM node:18 AS build

# Creez folderul de lucru
WORKDIR /app

# Copiez doar fișierele necesare pentru instalarea dependințelor
COPY package*.json ./
RUN npm install

# Apoi copiez restul codului sursă
COPY . .

# Fac build-ul aplicației Vite
RUN npm run build

# 2. Stage de producție cu Nginx
FROM nginx:alpine

# Copiez fișierele build-uite în folderul servit de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
