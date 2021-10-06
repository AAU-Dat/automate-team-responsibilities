export function partiallyRandomDistribution(team, responsibilities) {
    if (team.length < 2) throw new Error("You need a larger team");
    const number = process.env.GITHUB_RUN_NUMBER;

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