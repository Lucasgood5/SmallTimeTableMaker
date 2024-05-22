function UpdateJobsDiv() {
    let jobs = document.getElementById("jobs")
    jobs.innerHTML = ""

    for (let group of JobsGroupsKeys) {
        if (group == 0) continue
        let GroupDisplay = document.createElement("div")
        GroupDisplay.classList.add("GroupDisplay")
        jobs.appendChild(GroupDisplay)
        let maxCapacity = Math.max(...JobsGroups[group].map(job => job.capacity))
        GroupDisplay.style.height = maxCapacity * 40 + 40 + "px"

        let GroupName = document.createElement("div")
        GroupDisplay.appendChild(GroupName)
        GroupName.style.height = "40px"
        GroupName.innerHTML = group
        GroupName.style.textAlign = "center"
        GroupName.style.backgroundColor = JobsGroups[group][0].color

        let GroupDisplayTimeLine = document.createElement("div")
        GroupDisplay.appendChild(GroupDisplayTimeLine)
        GroupDisplayTimeLine.style.height = maxCapacity * 40 + "px"
        GroupDisplayTimeLine.style.backgroundColor = "#393"
        GroupDisplayTimeLine.style.width = "100%"

        let currentDelta = 0
        for (let hour = 13; hour < 27; hour++) {
            let HourDisplay = document.createElement("div")
            HourDisplay.classList.add("HourDisplay")
            GroupDisplayTimeLine.appendChild(HourDisplay)
            HourDisplay.style.left = Math.floor((Time(hour) - Time(12)) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            HourDisplay.style.top = currentDelta + "px"
            currentDelta -= maxCapacity * 40
        }

        for (let job of JobsGroups[group]) {
            let JobDisplay = document.createElement("div")
            JobDisplay.classList.add("JobDisplay")
            GroupDisplayTimeLine.appendChild(JobDisplay)
            JobDisplay.innerHTML = ""
            JobDisplay.style.height = job.capacity * 40 + "px"
            JobDisplay.style.left = Math.floor((job.start - Time(12) - job.getDayIndex() * TRUE_DAY_LENGTH) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            JobDisplay.style.width = Math.floor((job.end - job.start) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            JobDisplay.style.top = currentDelta + "px"
            currentDelta -= job.capacity * 40

            let JobName = document.createElement("div")
            JobName.classList.add("JobName")
            JobName.innerHTML = job.name
            JobName.style.height = "20px"
            JobDisplay.appendChild(JobName)
            JobName.style.position = "relative"
            JobName.style.top = -20 + "px"
            JobName.style.textAlign = "center"


            let rowindex = 0
            for (let shift of job.workers) {
                let ShiftDisplay = document.createElement("div")
                ShiftDisplay.classList.add("ShiftDisplay")
                GroupDisplayTimeLine.appendChild(ShiftDisplay)
                ShiftDisplay.innerHTML = shift.worker.name + "<br>" + shift.asStringTimes()
                ShiftDisplay.style.backgroundColor = shift.worker.favoriteColor
                ShiftDisplay.style.height = "40px"

                ShiftDisplay.style.left = Math.floor((shift.start - Time(12) - shift.getDayIndex() * TRUE_DAY_LENGTH) / (Time(27) - Time(12)) * 10000) / 100 + "%"
                ShiftDisplay.style.width = Math.floor((shift.end - shift.start) / (Time(27) - Time(12)) * 10000) / 100 + "%"
                ShiftDisplay.style.top = currentDelta + (40 * rowindex) + "px"
                currentDelta -= 40
                rowindex++
            }
        }


    }

    for (let job of JobsGroups[0]) {
        let GroupDisplay = document.createElement("div")
        GroupDisplay.classList.add("GroupDisplay")
        jobs.appendChild(GroupDisplay)
        GroupDisplay.style.height = 60 + "px"

        let GroupName = document.createElement("div")
        GroupName.classList.add("GroupName")
        GroupName.innerHTML = job.name
        GroupName.style.height = "20px"
        GroupDisplay.appendChild(GroupName)
        GroupName.style.textAlign = "center"
        GroupName.style.backgroundColor = job.color

        let GroupDisplayTimeLine = document.createElement("div")
        GroupDisplay.appendChild(GroupDisplayTimeLine)
        GroupDisplayTimeLine.style.height = "40px"
        GroupDisplayTimeLine.style.backgroundColor = "#393"
        GroupDisplayTimeLine.style.width = "100%"
        GroupDisplayTimeLine.style.position = "relative"

        let jobIndicator = document.createElement("div")
        jobIndicator.classList.add("JobIndicator")
        GroupDisplayTimeLine.appendChild(jobIndicator)
        jobIndicator.style.left = Math.floor((job.start - Time(12) - job.getDayIndex() * TRUE_DAY_LENGTH) / (Time(27) - Time(12)) * 10000) / 100 + "%"
        jobIndicator.style.width = Math.floor((job.end - job.start) / (Time(27) - Time(12)) * 10000) / 100 + "%"
        jobIndicator.style.height = "40px"
        jobIndicator.style.backgroundColor = "#f00"

        let currentDelta = -40
        for (let hour = 13; hour < 27; hour++) {
            let HourDisplay = document.createElement("div")
            HourDisplay.classList.add("HourDisplay")
            GroupDisplayTimeLine.appendChild(HourDisplay)
            HourDisplay.style.left = Math.floor((Time(hour) - Time(12)) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            HourDisplay.style.top = currentDelta + "px"
            currentDelta -= 40
        }

        for (let shift of job.workers) {
            let ShiftDisplay = document.createElement("div")
            ShiftDisplay.classList.add("ShiftDisplay")
            GroupDisplayTimeLine.appendChild(ShiftDisplay)
            ShiftDisplay.innerHTML = shift.worker.name + "<br>" + shift.asStringTimes()
            ShiftDisplay.style.backgroundColor = shift.worker.favoriteColor
            ShiftDisplay.style.height = "40px"

            ShiftDisplay.style.left = Math.floor((shift.start - Time(12) - shift.getDayIndex() * TRUE_DAY_LENGTH) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            ShiftDisplay.style.width = Math.floor((shift.end - shift.start) / (Time(27) - Time(12)) * 10000) / 100 + "%"
            ShiftDisplay.style.top = currentDelta + "px"
            currentDelta -= 40
        }
    }
}