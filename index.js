const core = require('@actions/core');
const github = require('@actions/github');
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

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}