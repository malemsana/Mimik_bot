const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the message contains an image
  if (msg.photo) {
    bot.sendMessage(chatId, 'Sorry, images are not allowed.');
  } else {
    try {
      // Send the text message to your backend
      await sendToBackend(text);

      // Reply to the user
      bot.sendMessage(chatId, 'Message received and sent to the backend.');
    } catch (error) {
      console.error('Error sending message to backend:', error.message);
      bot.sendMessage(chatId, 'Error processing your message. Please try again.');
    }
  }
});

// Function to send the message to your backend
async function sendToBackend(text) {
  const backendUrl = 'http://localhost:3000/webhook'; // Replace with your actual backend URL

  await axios.post(backendUrl, { text });
}
