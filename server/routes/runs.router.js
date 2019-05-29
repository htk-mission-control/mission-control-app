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
 * GET runs for coach
 */
router.get('/coach', (req, res) => {
    const sqlText = `
        SELECT "runs"."id", "runs"."name", COUNT(CASE WHEN "goals_per_run"."is_completed" THEN 1 end), "runs"."score" FROM "runs"
        JOIN "selected_missions" ON "run_id" = "runs"."id"
        JOIN "goals_per_run" ON "selected_missions_id" = "selected_missions"."id"
        GROUP BY "runs"."id";
    `
pool.query( sqlText )
    .then ( result => {
        console.log(result.rows);
        res.send( result.rows );
    }).catch ( error => {
        res.sendStatus( 500 );
    })
});

/**
 * GET runs for team
 */
router.get('/team', (req, res) => {
    const sqlText = ``
pool.query( sqlText )
    .then ( result => {
        res.send( result.rows );
    }).catch ( error => {
        res.sendStatus( 500 );
    })
});

module.exports = router;