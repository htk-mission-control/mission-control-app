const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
router.post('/', (req, res) => {

});

/**
 * POST to post all rundetails for coach with team id
 */
router.post('/', (req, res) => {

});

module.exports = router;