import { config } from './config'
import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'

const {telegramToken: token, track24Token} = config
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/track (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    try {
        const track = match[1];
        const {data: {data: {events, destinationName}}} = await axios.get(`https://api.track24.ru/tracking.json.php?apiKey=${track24Token}&domain=demo.track24.ru&pretty=true&code=${track}`)
        const lastEvent = events[events.length - 1]
        const {operationDateTime, operationAttribute, operationPlaceName} = lastEvent
        const message = 'Кому: ' + destinationName +'\r\n'+  'Дата: ' + operationDateTime +'\r\n'+ 'Статус: ' + operationAttribute +'\r\n'+ 'Место: ' + operationPlaceName;
        bot.sendMessage(chatId, message);
    } catch (e) {
        bot.sendMessage(chatId, 'Упс... Произошла ошибка');
    }
});
