const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

/**
 * GET to get all missions for current project
 */
router.get('/missions', (req, res) => {
    const sqlText = `SELECT "id", "project_id", "name", "description",
                     MAX("project_id") FROM "missions"
                     GROUP BY "id";`
pool.query( sqlText )
.then ( result => {
    // console.log(`in missions get result`, result.rows);
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
//  * GET to get details for latest run for logged in team
//  */

router.get('/selectedMissions', async (req, res) => {
    const client = await pool.connect();
    console.log(`in getSelectedMissions`, req.user);
    let teamId = req.user.id;
        try {
            let sqlText1 = `SELECT "runs"."id", "runs"."name" FROM "runs"
                            JOIN "teams" ON "teams"."id" = "runs"."team_id"
                            WHERE "team_user_id" = $1
                            ORDER BY "id" DESC LIMIT 1;`
            let sqlText2 = `SELECT
                            "selected_missions"."mission_id",
                            "missions"."name" AS "mission_name",
                            "missions"."description" AS "mission_description", 
                            "goals"."id" AS "goal_id",
                            "goals"."goal_type_id", 
                            "goals"."name" AS "goal_name", 
                            "goals"."points" AS "goal_points", 
                            "goals"."how_many_max", 
                            "goals"."how_many_min",
                            "goal_types"."type" AS "goal_type",
                            "either_or"."id" AS "either_or_id",
                            "either_or"."name" AS "either_or_name",
                            "either_or"."points" AS "either_or_points"
                            FROM "selected_missions"
                            JOIN "missions" ON "selected_missions"."mission_id" = "missions"."id"
                            JOIN "goals" ON "goals"."mission_id" = "missions"."id"
                            JOIN "goal_types" ON "goal_types"."id" = "goals"."goal_type_id"
                            LEFT JOIN "either_or" ON "goal_id" = "goals"."id"
                            WHERE "selected_missions"."run_id" = $1
                            ORDER BY "selected_missions"."mission_id";`

            await client.query('BEGIN')
            const runsIdResponse = await client.query(sqlText1, [teamId])
            const runId = runsIdResponse.rows[0].id;
            const selectedMissionsGetResponse = await client.query(sqlText2, [runId])
            await client.query('COMMIT')
            // console.log(`response in get selected missions request`, selectedMissionsGetResponse.rows);
            const runInfo = {
                id: runsIdResponse.rows[0].id, runName: runsIdResponse.rows[0].name, runDetails: selectedMissionsGetResponse.rows };
            // console.log(`runInfo in selected missions get`, runInfo);
            res.send(runInfo);
        }
        catch (error) {
            await client.query('ROLLBACK')
            console.log(`error getting your selected missions details`, error)
            res.sendStatus(500);
        }
        finally {
            client.release();
        }

});

module.exports = router;