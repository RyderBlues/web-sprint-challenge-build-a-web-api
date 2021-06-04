// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

// [GET] all projects
router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            if (!project) {
                res.status(404).json([]);
            }
            else {
                res.status(200).json(project);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting projects',
                error: err.message});
        });
});
// [GET] proj by id
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if(!project) {
                res.status(404).json({
                    message: 'Project not found'
                });
            }
            else {
                res.status(200).json(project);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error Finding Project',
                error: err.message
            });
        });
});

// [POST] proj
router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(newProj => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                    message: 'Project must have name and description'
                });
            }
            else {
                res.status(201).json(newProj);
            }
        })
        .catch(err => {
            res.status(400).json({
                message: 'Error posting new Project',
                error: err.message
            });
        });
});

// [PUT] update by proj id
router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(updated => {
            if (!updated) {
                res.status(404).json({
                    message: 'no project found'
                });
            }
            else {
                res.status(200).json(updated);
            }
        })
        .catch(() => {
            res.status(400).json({
                message: 'error updating project'
            });
        });
});

// [DELETE] by proj id
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
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

// [GET] actions by project id
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(resp => {
            if (!resp) {
                res.status(404).json({message: 'no project found'});
            }
            else {
                res.status(200).json(resp);
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
});

module.exports = router;