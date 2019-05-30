const express = require('express');
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

/**
 * GET runs for coach based on url query string
 */
router.get('/coach/:id', (req, res) => {

    let id = req.params.id;

    const sqlText = `
        SELECT "runs"."id", "runs"."name", COUNT(CASE WHEN "goals_per_run"."is_completed" THEN 1 end), "runs"."score" FROM "runs"
        JOIN "selected_missions" ON "run_id" = "runs"."id"
        JOIN "goals_per_run" ON "selected_missions_id" = "selected_missions"."id"
        WHERE "team_id" = $1
        GROUP BY "runs"."id";
    `;

    pool.query( sqlText, [id] )
        .then ( result => {
            // result should be an array of objects with run information
            // run id, run name, goals completed count, run score
            res.send( result.rows );
        }).catch ( error => {
            res.sendStatus( 500 );
        });
});

/**
 * GET runs for team based on user id
 */
router.get('/team', (req, res) => {

    let id = req.user.id;

    const sqlText = `
            SELECT "runs"."id", "runs"."name", COUNT(CASE WHEN "goals_per_run"."is_completed" THEN 1 end), "runs"."score" 
            FROM "runs"
            JOIN "selected_missions" ON "run_id" = "runs"."id"
            JOIN "goals_per_run" ON "selected_missions_id" = "selected_missions"."id"
            JOIN "teams" ON "teams"."id" = "runs"."team_id"
            WHERE "teams"."team_user_id" = $1
            GROUP BY "runs"."id";
        `;

    pool.query( sqlText, [id] )
        .then ( result => {
            // result should be an array of objects with run information
            // run id, run name, goals completed count, run score
            res.send( result.rows );
        }).catch ( error => {
            res.sendStatus( 500 );
        });
});

module.exports = router;