const express = require('express');
const router = express.Router();
const Log = require('../models/logs.js');

module.exports = router;

// new route
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// create route
router.post('/', (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true;
    } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }
    Log.create(req.body, (error, createdLog) => {
        res.redirect('/logs');
    });
});

// index route
router.get('/', (req, res) => {
    Log.find({}, (error, allLogs) => {
        res.render('index.ejs', {
            logs: allLogs,
        });
    });
});

// show route
router.get('/:id', (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
        res.render('show.ejs', {
            log: foundLog,
        });
    });
});

// delete route
router.delete('/:id', (req, res) => {
    Log.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/logs');
    });
});

// edit route
router.get('/:id/edit', (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
        //find the fruit
        res.render('edit.ejs', {
            log: foundLog, //pass in found fruit
        });
    });
});

// put route
router.put('/:id', (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Log.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedModel) => {
            res.redirect('/logs');
        },
    );
});

module.exports = router;
