const Discord = require("discord.js");
const { getWeekStartAndEnd } = require("./date")

const WEEK = getWeekStartAndEnd();
const AAU_BLUE = "#211a52";
const AAU_ICON =
    "https://media-exp1.licdn.com/dms/image/C510BAQHgfIxjqWSSsQ/company-logo_200_200/0/1519855922416?e=2159024400&v=beta&t=_L2XLMCXeEzSX_c8oBMM_uuEK1kgfno7ViFJXD5BP6U";
const ORGANIZATION = "https://github.com/AAU-Dat";
const OCTOCAT = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

function breakDiscordWebhook(webhook) {
    const array = webhook.split("/");
    const length = array.length;
    if (length < 3) throw new Error("Webhook probably misrepresented");

    if (array[length - 1] == "github") {
        return { id: array[length - 3], token: array[length - 2] };
    }

    return { id: array[length - 2], token: array[length - 1] };
};

export function buildDiscordEmbed(distribution) {
    const embed = new Discord.MessageEmbed()
        .setTitle("New distribution of responsibilities")
        .setDescription(`Who has which responsibility for ${WEEK.start} to ${WEEK.end}`)
        .setColor(AAU_BLUE)
        .setAuthor("AAU-dat", AAU_ICON, ORGANIZATION)
        .setFooter("Automated team responsibilities github action.")

    distribution.foreach(responsibility => {
        embed.addField(responsibility.title, responsibility.member, true);
    })
    embed.title
};

export function postToDiscord(embed, webhook) {
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

