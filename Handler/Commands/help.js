exports.run = (client, message, args) => {

    const { EmbedBuilder } = require('discord.js')
    const commands = client.commands
    const embed = new EmbedBuilder()
        .setTitle('**[HELP]**')
        .setColor(0x00ff00)

    embed.setFields({ name: "**Here's my available commands!**", value: commands.map(cmd => `**${client.prefix + cmd.name}** // *${cmd.description}*`).join('\n')})

    // if args is the commands, show usage
    if (args[0]) {
        const command = commands.get(args[0].toLowerCase())
        if (!command) return message.reply({ embeds: [{
            title: `**[ERROR]** Command Not Found!`,
            color: 0xff0000,
            description: `Please use \`${client.prefix}help\` to see all commands!`
        }] })
        message.reply({ embeds: [{
            title: `**[INFO]** of ${client.prefix + command.name}`,
            description: `***[DESCRIPTION]***\n*${command.description}*`,
            color: 0x00ff00,
            fields: [{ name: `**[USAGE]**`, value: `\`\`\` ${command.usage} \`\`\`` }]
        }] })
        return
    }

    message.reply({ embeds: [embed] })

}

exports.name = 'help'
exports.description = 'Replies with a list of commands.'
exports.cooldown = 5
exports.usage = `Shows mainly the usage of a command.`