module.exports = async (client, message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(client.prefix)) return

    const args = message.content.slice(client.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)

    const { Collection } = require('discord.js')

    if (!cmd) {
        message.reply({ embeds: [{
            title: `**[ERROR]** Command Not Found!`,
            color: 0xff0000,
            description: `Please use \`${client.prefix}help\` to see all commands!`
        }] })
        return
    }

    if (cmd) {
        if (!client.cooldowns.has(cmd.name)) {
            client.cooldowns.set(cmd.name, new Collection())
        }

        const now = Date.now()
        const timestamps = client.cooldowns.get(cmd.name)
        const cooldownAmount = (cmd.cooldown || 3) * 1000
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                message.reply({ embeds: [{
                    title: `**[ERROR]** Cooldown!`,
                    color: 0xff0000,
                    description: `Please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${cmd.name}\` command!`
                }] })
                return
            }
        }

        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    }

    if (cmd) cmd.run(client, message, args)
}