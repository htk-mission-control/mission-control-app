const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

/**
 * GET to get all missions for current project
 */
router.get('/missions', (req, res) => {
    const sqlText = `SELECT "id", "project_id", "name", "description", MAX("project_id") FROM "missions"
GROUP BY "id";`
pool.query( sqlText )
.then ( result => {
    console.log(`in missions get result`, result.rows);
    res.send( result.rows )
}).catch ( error => {
    res.sendStatus( 500 );
})
}); // end transaction

/**
 * POST to post all rundetails for logged in team
 */
router.post('/saveDetails', async (req, res) => {
    const client = await pool.connect();
    console.log(`req.body in saveDetails`, req.body);
    let teamId;
    let runDetails = req.body.runDetails.newRun;
    let runTeam = req.body.runDetails.runTeam;
    let selectedMissions = req.body.runDetails.newRun.selectedMissions;
    let currentDate = moment().format();

    if (req.user.security_clearance === 2) {
        try{
            teamId = req.body.id.teamId
            let sqlText1 = `INSERT INTO "runs" (team_id, name, date, driver, assistant, score_keeper)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`
            let sqlText2 = `INSERT INTO "selected_missions" (run_id, mission_id)
                    VALUES ($1, $2);`
            await client.query('BEGIN')
            const runsInsertResponse = await client.query(sqlText1, [teamId, runDetails.runName, currentDate, runTeam.driverId, runTeam.assistantId, runTeam.scorekeeperId])
            const runId = runsInsertResponse.rows[0].id;
            for (mission of selectedMissions) {
                if(mission.selected === true){
                    const selectedMissionsInsertResponse = await client.query(sqlText2, [runId, mission.id])
                }
            }
            await client.query('COMMIT')
            res.sendStatus(201);
        }
        catch ( error ) {
            await client.query('ROLLBACK')
            console.log(`error posting your run detials`, error)
            res.sendStatus(500);
        }
        finally{
            client.release();
        }

    }
    else if (req.user.security_clearance === 4) {
        teamId = req.user.id
        try {
            teamId = req.body.id
            let sqlText1 = `INSERT INTO "runs" (team_id, name, date, driver, assistant, score_keeper)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`
            let sqlText2 = `INSERT INTO "selected_missions" (run_id, mission_id)
                    VALUES ($1, $2);`
            await client.query('BEGIN')
            const runsInsertResponse = await client.query(sqlText1, [teamId, runDetails.runName, currentDate, runTeam.driverId, runTeam.assistantId, runTeam.scorekeeperId])
            const runId = runsInsertResponse.rows[0].id;
            for (mission of selectedMissions) {
                if (mission.selected === true) {
                    const selectedMissionsInsertResponse = await client.query(sqlText2, [runId, mission.id])
                }
            }
            await client.query('COMMIT')
            res.sendStatus(201);
        }
        catch (error) {
            await client.query('ROLLBACK')
            console.log(`error posting your run detials`, error)
            res.sendStatus(500);
        }
        finally {
            client.release();
        }
    }
    else {
        res.sendStatus(500);
    }
    
});

// /**
//  * POST to post all rundetails for coach with team id
//  */
// router.post('/saveDetails/:id', (req, res) => {
//     console.log(`req.body in saveDetails/id`, req.body);
//     console.log(`req.params.id in saveDetails/id`, req.params.id);
// });

module.exports = router;