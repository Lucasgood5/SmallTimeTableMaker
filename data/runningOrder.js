let GroupeTeste1 = new Jobs("GroupeTeste1", Time(13, 0, 2), Time(15, 0, 2), "CA", "CBPAON1", 1)
let GroupeTeste2 = new Jobs("GroupeTeste2", Time(15, 30, 2), Time(16, 30, 2), "CA", "CBPAON1", 3)
let GroupeTeste3 = new Jobs("GroupeTeste3", Time(17, 0, 2), Time(18, 0, 2), "CA", "CBPAON1", 2)

GroupeTeste1.addWorker(Lucas, Time(13, 0, 2), Time(15, 0, 2))
GroupeTeste2.addWorker(Lucas, Time(15, 30, 2), Time(16, 30, 2))
GroupeTeste2.addWorker(Nicolas, Time(15, 30, 2), Time(16, 30, 2))