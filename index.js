const { Client, GatewayIntentBits, Collection } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

const env = require('dotenv')
const fs = require('fs')

client.prefix = env.config('.env').parsed.PREFIX

client.commands = new Collection()
client.cooldowns = new Collection()

const events = fs.readdirSync('Handler/Events').filter(file => file.endsWith('.js'))
for (const files of events) {
    const eventsName = files.split('.')[0]
    const events = require(`./Handler/Events/${files}`)
    client.on(eventsName, events.bind(null, client))
}

const commands = fs.readdirSync('Handler/Commands').filter(file => file.endsWith('.js'))
for (const files of commands) {
    const commandsName = files.split('.')[0]
    const commands = require(`./Handler/Commands/${files}`)
    client.commands.set(commandsName, commands)
}

client.login(env.config('.env').parsed.TOKEN)