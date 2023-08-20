const launches = new Map();

let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27 , 2030"),
    target: "Kepler-442 b",
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
};


launches.set(launch.flightNumber, launch);


function getAllLaunches() {
    return Array.from(launches.values())
}
function exitsLaunchWithId(launchID){
    return launches.has(launchID)

}
function abortedLaunchByID(launchID){
    const aborted = launches.get(launchID)
    aborted.upcoming = false 
    aborted.success = false 
    return aborted 
     



}
function addNewLaunch(launch) {
    latestFlightNumber++
    launches.set(
        launch.latestFlightNumber,
        Object.assign(launch, {
            success:true,
            upcoming: true,
            customer:['Zero to Mastery', 'NASA'],
            flightNumber: latestFlightNumber

        })
    )

}


module.exports = {
    getAllLaunches,
    addNewLaunch,
    exitsLaunchWithId,
    abortedLaunchByID,
};
