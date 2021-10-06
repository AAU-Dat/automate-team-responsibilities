const Discord = require("discord.js");
const { getWeekStartAndEnd } = require("./date")

const WEEK = getWeekStartAndEnd();
const AAU_BLUE = "#211a52";
const AAU_ICON =
    "https://media-exp1.licdn.com/dms/image/C510BAQHgfIxjqWSSsQ/company-logo_200_200/0/1519855922416?e=2159024400&v=beta&t=_L2XLMCXeEzSX_c8oBMM_uuEK1kgfno7ViFJXD5BP6U";
const ORGANIZATION = "https://github.com/AAU-Dat";
const OCTOCAT =
    "https://camo.githubusercontent.com/b079fe922f00c4b86f1b724fbc2e8141c468794ce8adbc9b7456e5e1ad09c622/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f6769746875622e737667";

function breakDiscordWebhook(webhook) {
    const array = webhook.split("/");
    const length = array.length;
    if (length < 3) throw new Error("Webhook probably misrepresented");

    if (array[length - 1] == "github") {
        return { id: array[length - 3], token: array[length - 2] };
    }

    return { id: array[length - 2], token: array[length - 1] };
};

function buildDiscordEmbed(distribution) {
    let embed = new Discord.MessageEmbed()
        .setTitle("New distribution of responsibilities")
        .setDescription(`Who has which responsibility for ${WEEK.start} to ${WEEK.end}`)
        .setColor(AAU_BLUE)
        .setAuthor("AAU-dat", AAU_ICON, ORGANIZATION)
        .setFooter("Automated team responsibilities github action.");

    distribution.forEach(responsibility => {
        embed.addField(responsibility.title, responsibility.member, true);
    })

    return embed;
};

function postToDiscord(embed, webhook) {
    const { id, token } = breakDiscordWebhook(webhook);
    const webhookClient = new Discord.WebhookClient(id, token);

    webhookClient
        .send({
            username: "Github Action",
            avatarURL: OCTOCAT,
            embeds: [embed],
        })
        .catch(console.error);

    webhookClient.destroy();
};

module.exports = { buildDiscordEmbed, postToDiscord }