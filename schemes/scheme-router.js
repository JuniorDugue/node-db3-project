const express = require('express');

const Users = require('./scheme-model.js');

const router = express.Router();

//GET WORKING
router.get('/', (req, res) => {
  Users.find()
  .then(schemes => {
    res.json(schemes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

//GET BY ID WORKING
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});


// //WORKING
router.get('/:id/steps', (req, res) => {
  const { id } = req.params;
  Users.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Users.add(schemeData)
  .then(scheme => {
    res.status(201).json(scheme);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new scheme' });
  });
});

// POST is Working
router.post('/', async (req, res) => {
  try {
    const body = req.body 
    const test = await Schemes.add(body)
    if(test){
      res.status(200).json(test)
    }else{
      res.status(400).json({
        message: "Content is missing"
      })
    }
  } catch(err){
    res.status(500).json({ message: "The server is not responding"})
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
  .then(scheme => {
    if (scheme) {
      Users.update(changes, id)
      .then(updatedScheme => {
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

module.exports = router;