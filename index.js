import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const TOKEN = process.env.TELEGRAM_API;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Received your message");
});
