const express = require('express');
const pool = require('../modules/pool');
var moment = require('moment');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let sqlText = (`SELECT * FROM "projects";`)
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
    let currentDate = moment().format('MMMM DD YYYY')
    console.log('req.body post', newProject);
    
    let sqlText = (`INSERT INTO "projects" ("name", "description", "year", "published", "date_created")
                    VALUES ($1, $2, $3, $4, $5);`);
    pool.query(sqlText, [newProject.name, newProject.description, newProject.year, newProject.published, currentDate])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error adding new project', error);
        res.sendStatus(500);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;