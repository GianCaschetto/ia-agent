import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

// Api keys
const TELEGRAM_TOKEN = process.env.TELEGRAM_API;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MODEL_NAME = "gemini-1.0-pro";

const telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

async function runChat() {
	const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	const generationConfig = {
		temperature: 1,
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
		try {
			if (msg.text === "/start") {
				telegramBot.sendMessage(
					msg.chat.id,
					"Hola mi pana! soy tu bot conectado a gemini, puedes escribirme lo que quieras y te responderé con un mensaje generado por la IA de google. cualquier respuesta rara, es culpa de los de computación emergente"
				);
				return;
			}
			if (msg.text) {
				const result = await chat.sendMessage(msg.text);
				const response = result.response;
				if (response.text() !== "") {
					telegramBot.sendMessage(msg.chat.id, response.text(), { parse_mode: "Markdown" });
				} else {
					telegramBot.sendMessage(
						msg.chat.id,
						"No se puede responder a este mensaje, por favor intenta con otro mensaje"
					);
				}
			}
		} catch (error) {
			console.error("An error occurred:", error);
			telegramBot.sendMessage(
				msg.chat.id,
				"Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."
			);
		}
	});
}

runChat();
