require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { init, Count, Uptime } = require('./API/main');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let messageId = null;

client.once('ready', async () => {
  console.log(`[::] ${client.user.tag}`);
  await init();

  const channel = await client.channels.fetch(process.env.CHANNEL);

  async function buildMessage() {
    const players = await Count();
    const uptime = Uptime();
    return `\`\`\`\nThe Isle - ${players} - ${uptime}\n\`\`\``;
  }

  const firstMessage = await buildMessage();
  const message = await channel.send(firstMessage);
  messageId = message.id;

  setInterval(async () => {
    const msg = await channel.messages.fetch(messageId);
    const updated = await buildMessage();
    msg.edit(updated);
  }, 30000);

  setInterval(() => {
    startTime = Date.now();
  }, 3600000);
});

client.login(process.env.TOKEN);
