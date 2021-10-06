function getWeekStartAndEnd() {
    const today = new Date();
    const weekend = new Date();
    weekend.setDate(weekend.getDate() + 6);

    return {
        start: today.toDateString(),
        end: weekend.toDateString()
    }
}

module.exports = { getWeekStartAndEnd }