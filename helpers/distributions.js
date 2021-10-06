// deprecated, saved for posterity.
function partiallyRandomDistribution(team, responsibilities) {
    if (team.length < 2) throw new Error("You need a larger team");
    let number = process.env.GITHUB_RUN_NUMBER;

    let distribution = [];

    responsibilities.forEach(responsibility => {
        if (responsibility.number < 1) throw new Error("The number associated with each responsibility must be at least 1");

        let random = (Math.random() * team.length / responsibility.number) + 1;

        for (let i = 0; i < responsibility.number; i++) {
            distribution.push(
                {
                    title: responsibility.name,
                    member: team[(number + random * i) % team.length]
                });
        }
        number += 2;
    });

    return distribution;
}

function determineDistribution(team, responsibilities) {
    if (team.length < 2) throw new Error("You need a larger team");
    if (team.length < responsibilities.length) throw new Error("You must have more team members than responsibilities")

    let number = process.env.GITHUB_RUN_NUMBER;
    let distribution = [];

    responsibilities.forEach(responsibility => {
        if (responsibility.random) {
            distribution.push({
                title: responsibility.name,
                member: team[(Math.random() * team.length) % team.length]
            })
        } else {
            distribution.push({
                title: responsibility.name,
                member: team.splice(number % team.length, 1)[0]
            })
            number++;
        }
    })

    return distribution;
}

module.exports = { determineDistribution }