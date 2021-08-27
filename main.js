// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

let namesArray = ["numair", "bassel-nader", "Charlesb", "Chris Dirkswager", "edwerner", "Ethan Wilson", "Internet Die Counter", "John Glennan", "jordan gaten", "JuliaWeakley", "Liam Hunt", "Matthew_Nicholson", "Mät", "nelsonmei", "Shahid", "veselin.georgiev", "Wayne", "wrembish", "pizza", "callthecapital"]
let names = namesArray.map(n => n.replace(/ /g, ""))
console.log(names)
let counter = []

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on("message", msg => {
	console.log(msg.content)
	newMsg = msg.content.toLowerCase()
	if (newMsg === '!outage') {
		counter.map(n => {
			msg.reply(`${n.name} : outages ${n.outage}`)
		})
	}	else if (newMsg[0] === '!') {
		//take away ! and assign to new variable
		let strip = newMsg.substr(1)
		let strip1 = strip.replace(/ /g, "")
		console.log(strip1)
		//check against the array of names
		let n = names.map(n => n.toLowerCase())
		if (n.indexOf(strip1) > -1) {
			//add to a counter 
			let i = counter.findIndex(c => {
				return c.name === strip;
			})
			if (i === -1) {
				counter.push({name: strip, outage: 1})
				msg.reply(`Congrats @${strip} you now have 1 :electric_plug: Disconnect`)
			} else {
				counter[i].outage ++
				msg.reply(`Current Toll for ${counter[i].name} : ${counter[i].outage}`)
			}
		}
	} 
})

client.on('interactionCreate', async interaction => {
	console.log(interaction)
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'outage') {
		await interaction.reply('out');
		console.log(interaction)
	}
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);