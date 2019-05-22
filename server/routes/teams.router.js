const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET teams by coach id
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let coachId = req.params.id;

    let sqlText = `SELECT * FROM "teams" WHERE "coach_user_id" = $1`;
    pool.query( sqlText, [coachId] )
        .then( results => {
            res.send(results.rows);
        })
        .catch( (error) => {
            console.log( `Couldn't get teams by coach_user_id.`, req.params );
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {

});

module.exports = router;