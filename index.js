import TelegramBot from "node-telegram-bot-api";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import "dotenv/config";

//Api keys
const TELEGRAM_TOKEN = process.env.TELEGRAM_API;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MODEL_NAME = "gemini-1.0-pro";

const telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

async function runChat() {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.5,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  telegramBot.on("message", async (msg) => {
    if(msg.text === '/start'){
      telegramBot.sendMessage('Hola mi pana! soy tu bot conectado a gemini, puedes escribirme lo que quieras y te responderé con un mensaje generado por la IA de google. cualquier respuesta rara, es culpa de los de computación emergente');
      return;
    }
    if(msg.text){
 
      const result = await chat.sendMessage(msg.text);
      const response = result.response;
      telegramBot.sendMessage(msg.chat.id, response.text());
    }
  });
}

runChat();
