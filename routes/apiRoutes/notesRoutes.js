const router = require('express').Router();
const note = require('../../db/db.json');
const {v4:uuid} = require('uuid');
const fs = require('fs');
const path = require('path');


router.get('/notes', (req, res) => {
    res.json(note);
})

router.get('/notes/:id', (req, res) => {
    for (let i = 0; i < note.length; i++) {
        if (note[i].id === req.params.id) {
            res.json(note[i]);
        }
    }
});

router.post('/notes', (req, res) => {
    const newNote = { 
        "title": req.body.title,
        "text": req.body.text,
        "id": uuid()
    }
    note.push(newNote)
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'),
    JSON.stringify(note, null, 2))
    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    for (let i = 0; i < note.length; i++) {
        if (note[i].id === req.params.id) {
            note.splice(i, 1);
        }
    }
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'),
    JSON.stringify(note, null, 2))
    res.json(note);
})

module.exports = router;