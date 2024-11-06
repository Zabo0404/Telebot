const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot('7893715163:AAEt86Za-S6BdL4rqoFVbZNn-4gaWJOYcQ4', { polling: true });

// Fungsi untuk mendapatkan ownerId
async function getOwnerId() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/Zabo0404/Database/main/owner.json');
        return response.data.owners;
    } catch (error) {
        console.error('Error fetching owner ID:', error);
        return null;
    }
}


// Menambahkan perintah /start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const ownerId = await getOwnerId();

    console.log(`Chat ID: ${chatId}, Owner IDs: ${ownerId}`);

    if (ownerId && ownerId.includes(chatId.toString())) {
        bot.sendMessage(chatId, 'Selamat datang di bot saya!');
    } else {
        bot.sendMessage(chatId, 'Anda tidak memiliki akses ke bot ini.');
    }
});
