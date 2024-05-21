const AllJobs = [];
const JobsGroups = []
const JobsGroupsKeys = []
class Jobs {
    constructor(name, start, end, type = "autres", group = 0, capacity = 1, color = undefined) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.capacity = capacity;
        this.color = color || "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        this.workers = [];
        this.id = AllJobs.length;
        AllJobs.push(this);
        if (!JobsGroups[group]) { JobsGroups[group] = []; JobsGroupsKeys.push(group); }
        JobsGroups[group].push(this);
    }

    addWorker(worker, start, end) {
        new Shift(worker, this, start, end);
    }

    getDayIndex() {
        return this.start.getDate() - 21;
    }
}

const AllWorkers = [];
class Worker {
    constructor(name, favoriteColor) {
        this.name = name;
        this.favoriteColor = favoriteColor || "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        this.jobs = [];
        this.id = AllWorkers.length;
        AllWorkers.push(this);
    }

    addShift(job, start, end) {
        new Shift(this, job, start, end);
    }
}

const AllShifts = [];
class Shift {
    constructor(worker, job, start, end) {
        this.worker = worker;
        this.job = job;
        this.start = start;
        this.end = end;
        this.id = AllShifts.length;
        AllShifts.push(this);
        worker.jobs.push(this);
        worker.jobs = worker.jobs.sort((a, b) => a.start - b.start);
        job.workers.push(this);
        job.workers = job.workers.sort((a, b) => a.start - b.start);
    }

    getDayIndex() {
        return this.start.getDate() - 21;
    }

    asStringTimes() {
        let stringtwodigits = (n) => n < 10 ? "0" + n : n;
        return stringtwodigits(this.start.getHours()) + "h" + stringtwodigits(this.start.getMinutes()) + " - " + stringtwodigits(this.end.getHours()) + "h" + stringtwodigits(this.end.getMinutes());
    }
}

function Time(h, m = 0, di = 0) {
    return new Date(2024, 6, 21 + di, h, m);
}

const dayStart = [Time(17), Time(13, 0, 1), Time(13, 0, 2)]
const deltaDayStart = [dayStart[0] - Time(12), dayStart[1] - Time(12, 0, 1), dayStart[2] - Time(12, 0, 2)]
const dayEnd = [Time(26), Time(26, 0, 1), Time(24, 0, 2)]
const deltaDayEnd = [dayEnd[0] - Time(12), dayEnd[1] - Time(12, 0, 1), dayEnd[2] - Time(12, 0, 2)]
const deltaDayEndEnd = [Time(27) - dayEnd[0], Time(27, 0, 1) - dayEnd[1], Time(27, 0, 2) - dayEnd[2]]

const TRUE_DAY_LENGTH = Time(1, 0, 1) - Time(1, 0, 0)