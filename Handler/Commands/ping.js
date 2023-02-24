exports.run = (client, message, args) => {
    message.reply({ embeds: [{
        title: `**[PONG]**`,
        color: 0x00ff00,
        description: `Latency is **${Date.now() - message.createdTimestamp}**ms. API Latency is **${Math.round(client.ws.ping)}**ms.`
    }] })
}

exports.name = 'ping'
exports.description = 'Replies Pong!'
exports.cooldown = 2
exports.usage = `Shows the latency of the bot.`