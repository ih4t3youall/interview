const auth = require("../middleware/auth");
const comment_service = require("../services/comment_service");
const logger = require('../util/logger')('comments_route');
const express = require('express');
const router = express.Router();


// Create Comment
router.post('/', auth, async (req, res) => {
  const comment_obj = req.body;
  logger.info("User " + req.user.id + " is creating the comment " + JSON.stringify(comment_obj));

  const { error } = comment_service.validateComment(comment_obj);
  if (error) return res.status(400).send(error.details[0].message);

  const created = await comment_service.createComment(comment_obj);

  res.send({'created': created});
});


// Update Comment
router.put('/:id', auth, async (req, res) => {
  const comment = req.body;
  logger.info("Update comment called " + JSON.stringify(comment));

  const comment_id = req.params.id;
  const updated = await comment_service.updateComment(comment_id, comment);

  res.send({'updated': updated});
});


// Delete Comment by ID
router.delete('/:id', auth, async (req, res) => {
  const comment_id = req.params.id;
  logger.info("User " + req.user.id + " to delete comment " + comment_id + " called");
  const deleted = await comment_service.deleteCommentByID(comment_id);
  res.send({'deleted': deleted});
});

module.exports = router;