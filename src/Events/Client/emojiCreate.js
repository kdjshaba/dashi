const { EmbedBuilder } = require("discord.js")

module.exports = {
	name: "emojiCreate",
	async run(client, emoji, defaultColor, logChannel) {
		const logs = await client.channels.cache.get(logChannel)
		const auditLog = await emoji.guild.fetchAuditLogs()
		const logEntry = auditLog.entries.first()
		const { executor } = logEntry

		const embed = new EmbedBuilder()
			.setTitle("🆕 Emoji Created")
			.setDescription(
				`Emoji: <:${emoji.name}:${emoji.id}>\nID: **${emoji.id}**\nCreated by: <@${executor.id}>`
			)
			.setColor(defaultColor)
			.setTimestamp()

		logs.send({
			embeds: [embed],
		}).catch((err) => {
			console.log(err)
		})
	},
}
