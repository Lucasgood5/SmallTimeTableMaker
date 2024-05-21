function UpdateTeamDiv() {
    let team = document.getElementById("equipe")
    team.innerHTML = ""
    for (let worker of AllWorkers) {
        let WorkerDisplay = document.createElement("div")
        WorkerDisplay.classList.add("WorkerDisplay")
        team.appendChild(WorkerDisplay)
        WorkerDisplay.style.backgroundColor = worker.favoriteColor

        let WorkerName = document.createElement("div")
        WorkerName.classList.add("WorkerName")
        WorkerName.innerHTML = worker.name
        WorkerDisplay.appendChild(WorkerName)

        let WorkerJobs = document.createElement("div")
        WorkerJobs.classList.add("WorkerJobs")
        WorkerDisplay.appendChild(WorkerJobs)



        let WorkerDays = []
        for (let day = 0; day < 3; day++) {
            let WorkerDay = document.createElement("div")
            WorkerDay.classList.add("WorkerDay")
            // WorkerDay.innerHTML = "Jour " + (day + 1)
            WorkerDays.push(WorkerDay)
            WorkerJobs.appendChild(WorkerDay)

            for (let hour = 13; hour < 27; hour++) {
                let HourDisplay = document.createElement("div")
                HourDisplay.classList.add("HourDisplay")
                WorkerDay.appendChild(HourDisplay)
                HourDisplay.style.left = Math.floor((Time(hour) - Time(12)) / (Time(27) - Time(12)) * 10000) / 100 + "%"
                HourDisplay.style.top = (WorkerDay.childElementCount - 1) * -100 + "%"
            }

            let leftReposal = document.createElement("div")
            leftReposal.classList.add("freetime")
            WorkerDay.appendChild(leftReposal)
            leftReposal.style.textAlign = "right"
            leftReposal.style.width = Math.floor(deltaDayStart[day] / (Time(27) - Time(12)) * 10000) / 100 + "%"
            leftReposal.style.top = (WorkerDay.childElementCount - 1) * -100 + "%"

            let rightReposal = document.createElement("div")
            rightReposal.classList.add("freetime")
            WorkerDay.appendChild(rightReposal)
            rightReposal.style.width = Math.ceil((deltaDayEndEnd[day]) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            rightReposal.style.left = Math.floor(deltaDayEnd[day] / (Time(27) - Time(12)) * 10000) / 100 + "%"
            rightReposal.style.top = (WorkerDay.childElementCount - 1) * -100 + "%"
        }



        for (let shift of worker.jobs) {
            let ShiftDisplay = document.createElement("div")
            ShiftDisplay.classList.add("ShiftDisplay")
            let parent = WorkerDays[shift.getDayIndex()]
            parent.appendChild(ShiftDisplay)
            ShiftDisplay.style.backgroundColor = worker.favoriteColor
            ShiftDisplay.innerHTML = shift.job.name + "<br>" + shift.asStringTimes()

            ShiftDisplay.style.top = (parent.childElementCount - 1) * -100 + "%"
            ShiftDisplay.style.left = Math.floor((shift.start - Time(12) - shift.getDayIndex() * TRUE_DAY_LENGTH) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            ShiftDisplay.style.width = Math.floor((shift.end - shift.start) / (Time(27) - Time(12)) * 10000) / 100 + "%"
        }
    }
}
