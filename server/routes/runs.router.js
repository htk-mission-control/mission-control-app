const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/missions', (req, res) => {
    const sqlText = `SELECT "id", "project_id", "name", "description", MAX("project_id") FROM "missions"
GROUP BY "id";`
pool.query( sqlText )
.then ( result => {
    res.send( result.rows )
}).catch ( error => {
    res.sendStatus( 500 );
})
}); // end transaction


router.get( '/runHistoryDetails/:id', rejectUnauthenticated, (req, res) => {
    const runId = req.params.id;
    console.log( `runId:`, runId );
    
    let sqlText = `SELECT r."id", r."name", r."date", r."score", r."penalties", r."notes",
                    (CASE WHEN r."driver" = t."id" THEN t."name" END) AS "driver", 
                    (CASE WHEN r."assistant" = t1."id" THEN t1."name" END) AS "assistant", 
                    (CASE WHEN r."score_keeper" = t2."id" THEN t2."name" END) AS "score_keeper"
                    FROM "runs" AS r
                    LEFT JOIN "team_members" AS t ON t."id" = r."driver"
                    JOIN "team_members" AS t1 ON t1."id" = r."assistant"
                    JOIN "team_members" AS t2 ON t2."id" = r."score_keeper"
                    WHERE r."id" = $1
                    GROUP BY r."id", t."id", t1."id", t2."id"`;

    pool.query( sqlText, [runId] )
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log( `Couldn't get run details by id.`, error );
            res.sendStatus(500);
        })
} )

router.put( `/summary/:id`, rejectUnauthenticated, (req, res) => {
    console.log( `HERE!` );
    
    const runId = req.params.id;
    const runNotes = req.body.notes;
    console.log( `Notes:`, runNotes );

    let sqlText = `UPDATE "runs" 
                    SET "notes" = $1
                    WHERE "id" = $2;`;

    pool.query( sqlText, [runNotes, runId] )
        .then( (response) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log( `Couldn't update run summary notes.`, error );
            res.sendStatus(500);
        })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;