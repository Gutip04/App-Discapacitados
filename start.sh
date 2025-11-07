#!/bin/bash

# Entrar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Compilar TypeScript 
npm run build

# Iniciar el servidor
npm run start
