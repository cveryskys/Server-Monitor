const noblox = require("noblox.js");

let startTime = Date.now();

async function init() {
  await noblox.setCookie(process.env.COOKIE);
}

async function Count() {
  try {
    const instances = await noblox.getGameInstances(process.env.GAME);
    let total = 0;
    for (const instance of instances) {
      total += instance.currentPlayers;
    }
    return total;
  } catch (err) {
    return 0;
  }
}

function Uptime() {
  const hours = Math.floor((Date.now() - startTime) / (1000 * 60 * 60));
  return `${hours}H`;
}

module.exports = {
  init,
  Count,
  Uptime,
};
