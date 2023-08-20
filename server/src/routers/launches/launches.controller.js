const { getAllLaunches,
    addNewLaunch,
    exitsLaunchWithId,
    abortedLaunchByID
 } = require('../../models/launches.model.js')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())

}
function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target) {

        return res.status(404).json({
            error: 'Missing required launch property  '
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invaild  launch date '
        })
    }

    addNewLaunch(launch)
    return res.status(201).json(launch)
}
 function httpAbortLaunch(req,res){
    const launchID = Number(req.params.id)
    if(!exitsLaunchWithId(launchID)){
    return res.status(404).json({
        error: " Launch not found "

    })}
    const aborted = abortedLaunchByID(launchID)
    return res.status(200).json(aborted)
    
    


 }

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}