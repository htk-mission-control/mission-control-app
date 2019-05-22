const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/missions', (req, res) => {
    const client = await pool.connect();
    try {
        await client.query( 'BEGIN' );
        let sqlText = ``;
        await client.query( sqlText, [] );
        await client.query( 'COMMIT' );
        res.sendStatus( 200 );
    } catch ( error ) {
        await client.query( 'ROLLBACK' );
        console.log(`error making db query`, error);
        res.sendStatus( 500 );
    } finally {
        client.release();
    }
}); // end transaction

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;