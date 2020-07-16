import { config } from './config'
import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'

const {token} = config
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/right/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Максим прав');
});

bot.onText(/\/wrong/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Максим не прав');
});

bot.onText(/\/advice/, async (msg) => {
    try {
      const chatId = msg.chat.id
      const {data: {quoteText}} = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru')
      bot.sendMessage(chatId, quoteText);
    } catch (e) {
      bot.sendMessage(chatId, 'Упс... ошибка');
    }
});
