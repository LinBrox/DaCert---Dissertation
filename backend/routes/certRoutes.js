const express = require('express')
const {
  getCerts,
  createCert,
  getCertById,
  updateCert,
  deleteCert,
} = require('../controllers/certController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(protect, getCerts)
router.route('/create').post(protect, createCert)
router
  .route('/:id')
  .get(getCertById)
  .put(protect, updateCert)
  .delete(protect, deleteCert)

module.exports = router
