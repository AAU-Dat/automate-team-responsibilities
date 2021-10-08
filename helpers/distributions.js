function determineDistribution(team, responsibilities) {
    if (team.length < 2) throw new Error("You need a larger team");
    if (team.length < responsibilities.length) throw new Error("You must have more team members than responsibilities");

    let number = process.env.GITHUB_RUN_NUMBER;
    let distribution = [];

    responsibilities.forEach(responsibility => {
        number = number % team.length;
        if (responsibility.random) {
            distribution.push({
                title: responsibility.name,
                member: team[Math.floor(Math.random() * team.length)]
            })
        } else {
            distribution.push({
                title: responsibility.name,
                member: team.splice(number, 1)
            })
        }
    })

    return distribution;
}

module.exports = { determineDistribution }