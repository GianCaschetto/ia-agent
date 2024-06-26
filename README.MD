# Telegram Bot con Google Gemini AI

Este proyecto implementa un bot de Telegram que utiliza la API de Gemini Google Studio para generar respuestas a los mensajes enviados por los usuarios. El bot está configurado para manejar contenido sensible y generar respuestas seguras.

## Requisitos

- Node.js
- NPM (Node Package Manager)
- Una cuenta de Telegram para crear un bot y obtener un token de API
- Una clave de API de Google para acceder a los servicios de Gemini Google Studio

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/GianCaschetto/telegram-ia-agent
   cd telegram-ia-agent
2. Instala las dependencias del proyecto:
    npm install
3. Crea un archivo .env en la raíz del proyecto y añade tus claves de API:
    TELEGRAM_API=tu-telegram-api-key
    GOOGLE_API_KEY=tu-google-api-key

## Uso
Para ejecutar el bot, simplemente usa el siguiente comando:
node index.js o npm start

El bot enviará un mensaje de bienvenida al enviar el comando /start y comenzará a responder a cada mensaje recibido utilizando la API de Gemini Google Studio.
