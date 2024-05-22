let workersStatsComparaison = {}
workersStatsComparaison.totalWorkTime = []
workersStatsComparaison.totalWorkTimePerDay = {}
workersStatsComparaison.totalWorkTimePerDayPerJobType = {}
let JobTypeKeys = []
for (let worker of AllWorkers) {
    let stats = {}
    stats.totalWorkTime = 0
    stats.totalWorkTimePerDay = {}
    stats.totalWorkTimePerDayPerJobType = {}

    for (let shift of worker.jobs) {
        stats.totalWorkTime += (shift.end - shift.start) / 1000 / 60 / 60

        let dayIndex = shift.start.getDate() - 21
        if (!stats.totalWorkTimePerDay[dayIndex]) { stats.totalWorkTimePerDay[dayIndex] = 0 }
        stats.totalWorkTimePerDay[dayIndex] += (shift.end - shift.start) / 1000 / 60 / 60


        let jobType = shift.job.name
        if (!stats.totalWorkTimePerDayPerJobType[jobType]) {
            stats.totalWorkTimePerDayPerJobType[jobType] = 0
            if (!JobTypeKeys.includes(jobType)) { JobTypeKeys.push(jobType) }
        }
        stats.totalWorkTimePerDayPerJobType[jobType] += (shift.end - shift.start) / 1000 / 60 / 60
    }

    workersStatsComparaison.totalWorkTime.push(stats.totalWorkTime)
    for (let dayIndex in stats.totalWorkTimePerDay) {
        if (!workersStatsComparaison.totalWorkTimePerDay[dayIndex]) { workersStatsComparaison.totalWorkTimePerDay[dayIndex] = [] }
        workersStatsComparaison.totalWorkTimePerDay[dayIndex].push(stats.totalWorkTimePerDay[dayIndex])
    }
    for (let jobType of JobTypeKeys) {
        if (!workersStatsComparaison.totalWorkTimePerDayPerJobType[jobType]) { workersStatsComparaison.totalWorkTimePerDayPerJobType[jobType] = [] }
        workersStatsComparaison.totalWorkTimePerDayPerJobType[jobType].push(stats.totalWorkTimePerDayPerJobType[jobType])
    }

    console.log(worker.name, stats)
    worker.stats = stats
}
console.log("comparator ", workersStatsComparaison)