const core = require('@actions/core');
const { buildDiscordEmbed, postToDiscord } = require("./helpers/discordFunctions");
const { partiallyRandomDistribution } = require("./helpers/distributions")

try {
  // input defined in action metadata file
  const team = JSON.parse(core.getInput('team'));
  const responsibilities = JSON.parse(core.getInput('responsibilities'));
  const discordWebhook = core.getInput('discord-webhook');

  const distribution = partiallyRandomDistribution(team, responsibilities);
  const embed = buildDiscordEmbed(distribution);

  postToDiscord(embed, discordWebhook);

  core.setOutput("responsibility-distribution", JSON.stringify(distribution));

} catch (error) {
  core.setFailed(error.message);
}