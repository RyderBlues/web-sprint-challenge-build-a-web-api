// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            if (!action) {
                res.status(404).json([]);
            }
            else {
                res.status(200).json(action);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting actions',
                error: err.message});
        });
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            if(!action) {
                res.status(404).json({
                    message: 'action not found'
                });
            }
            else {
                res.status(200).json(action);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error Finding action',
                error: err.message
            });
        });
});

router.post('/', (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            if (!req.body.project_id || !req.body.description || !req.body.notes) {
                res.status(400).json({
                    message: 'Actions must have a project id, description, and notes.'
                });
            }
            else {
                res.status(201).json(action);
            }
        })
        .catch(err => {
            res.status(400).json({
                message: 'Error posting new Action',
                error: err.message
            });
        });
});

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(updated => {
            if (!updated) {
                res.status(404).json({
                    message: 'no action found'
                });
            }
            else {
                res.status(200).json(updated);
            }
        })
        .catch(() => {
            res.status(400).json({
                message: 'error updating action'
            });
        });
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(deleted => {
            if (!req.body.id) {
                res.status(404).json({message: 'no project found'})
            }
            else {
                res.status(200).json(deleted);
            }
        })
        .catch(err => {
            res.status(404).json({
                error: err.message});
        });
});

module.exports = router;