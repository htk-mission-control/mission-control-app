const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/missions', (req, res) => {
    const sqlText = ``
    pool.query = {
        
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;