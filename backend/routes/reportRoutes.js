const express = require('express');
const router = express.Router();
const { 
  createReport, 
  getReports, 
  getReport, 
  updateReport, 
  deleteReport,
  generateNarrative
} = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getReports)
  .post(createReport);

router.route('/:id')
  .get(getReport)
  .put(updateReport)
  .delete(deleteReport);

router.post('/narrative', generateNarrative);

module.exports = router;