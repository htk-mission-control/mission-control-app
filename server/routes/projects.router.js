const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
var moment = require('moment');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let sqlText = (`SELECT * FROM "projects" ORDER BY "id" DESC;`)
    pool.query(sqlText)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Something went wrong getting project info', error);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    let newProject = req.body;
    let currentDate = moment().format()
    console.log('req.body post', newProject);
    
    let sqlText = (`INSERT INTO "projects" ("name", "description", "year", "published", "date_created")
                    VALUES ($1, $2, $3, $4, $5) RETURNING id;`);
    pool.query(sqlText, [newProject.name, newProject.description, newProject.year, newProject.published, currentDate])
    .then((result) => {
        res.send(result.row);
    })
    .catch((error) => {
        console.log('Error adding new project', error);
        res.sendStatus(500);
    })
})

// add penalty
router.post( '/penalty', rejectUnauthenticated, (req, res) => {
    console.log( `req.body:`, req.body );
    let penalty = req.body;

    let sqlText = `INSERT INTO "penalties" ("project_id", "name", "description", "points", "max")
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(sqlText, [penalty.project_id, penalty.name, penalty.description, penalty.points, penalty.max] )
        .then( (response) => {
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log( `Couldn't add penalty.`, error );
            res.sendStatus(500);
        })
})

// get penalty data for edit
router.get( `/penalty/:id`, rejectUnauthenticated, (req, res) => {
    let penalty_id = req.params.id;

    let sqlText = `SELECT * FROM "penalties" WHERE "id" = $1;`;
    pool.query( sqlText, [penalty_id] )
        .then( (result) => {
            res.send(result.rows[0]);
        })
        .catch( (error) => {
            console.log( `Couldn't get penalty data.`, error );
            res.sendStatus(500);
        })
})

// update edited penalty
router.put( `/penalty`, rejectUnauthenticated, (req, res) => {
    let penalty = req.body;

    let sqlText = `UPDATE "penalties" 
                    SET "name" = $1, "description" = $2, 
                    "points" = $3, "max" = $4 
                    WHERE "id" = $5;`;
    pool.query( sqlText, 
        [penalty.name, penalty.description, penalty.points, penalty.max, penalty.penalty_id] )
        .then( (response) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log( `Couldn't update penatly.`, error );
            res.sendStatus(500);
        })
})

// get goal types for adding/editing missions
router.get( '/goalTypes', rejectUnauthenticated, (req, res) => {
    let sqlText = `SELECT * FROM "goal_types" ORDER BY "id";`;

    pool.query( sqlText )
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log( `Couldn't get goal types.`, error );
            res.sendStatus(500);
        })
})

// save mission data
router.post( '/mission', rejectUnauthenticated, async(req, res) => {
    console.log( 'in mission POST...' );
    
    const client = await pool.connect();
    let mission = req.body;
    let goals = mission.goals;

    // let sqlText3 = `INSERT INTO "either_or" ("goal_id", "name", "points")
    //                 VALUES ( $1, $2, $3 );`;
    
    try {
        console.log( 'in mission POST try...' );
        
        await client.query('BEGIN');

        let sqlText1 = `INSERT INTO "missions" ("project_id", "name", "description")
                        VALUES ( $1, $2, $3 ) 
                        RETURNING "id";`;

        const id = await client.query( sqlText1, 
            [mission.project_id, mission.name, mission.description]);

        const missionId = id.rows[0].id;

        for( let goal of goals ){
            console.log( `in da looooop...`, goal );
            
            if(goal.type === '1'){
                console.log( `in Yes/No..` );
                
                let sqlText2 = `INSERT INTO "goals" 
                                ("mission_id", "goal_type_id", "name", "points")
                                VALUES ( $1, $2, $3, $4 );`;
                await client.query( sqlText2, [missionId, goal.type, goal.name, goal.points]);

            } else if(goal.type === '2'){
                console.log( `in E/O..` );
                let sqlText2 = `INSERT INTO "goals" 
                                ("mission_id", "goal_type_id")
                                VALUES ( $1, $2);`;
                const goalId = await client.query( sqlText2, [missionId, goal.type]);
                // await client.query( sqlText3, [goalId[0].id,  ]);

            } else if(goal.type === '3'){
                console.log( `in How many..` );
                let sqlText2 = `INSERT INTO "goals" 
                                ("mission_id", "goal_type_id", "name", "points", "how_many_max", "how_many_min")
                                VALUES ( $1, $2, $3, $4, $5, $6 );`;
                await client.query( sqlText2, [missionId, goal.type, goal.name, goal.points, goal.max, goal.min]);
            }
        }

        await client.query('COMMIT');
        res.sendStatus(201);
    } catch(error) {   
        await client.query('ROLLBACK');
        console.log( `Couldn't POST mission, goal data.`, error );
        res.sendStatus(500);
    } finally {
        client.release()
      }
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;