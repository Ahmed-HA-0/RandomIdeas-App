const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).send({ success: false, error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ sucsess: true, data: idea });
  } catch (error) {
    res.status(500).send({ success: false, error: 'Something went wrong' });
  }
});

router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: 'Something went wrong' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          text: req.body.text,
          tag: req.body.tag,
        },
        { new: true }
      );

      return res.json({ success: true, data: updatedIdea });
    } else {
      return res.status(403).send({
        success: false,
        error: 'You are not authorized to update the post',
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: 'Something went wrong' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      const ideaDelete = await Idea.findByIdAndDelete(req.params.id);
      console.log(ideaDelete);
      return res.json({ sucsess: true, data: ideaDelete });
    }

    res.status(403).send({
      success: false,
      error: 'You are not authorized to delete the post',
    });
  } catch (error) {
    res.status(403).send({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
