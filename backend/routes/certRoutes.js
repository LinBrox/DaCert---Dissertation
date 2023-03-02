const express = require('express')
const {
  getCerts,
  createCert,
  getCertById,
  updateCert,
  deleteCert,
} = require('../controllers/certController')
const { protect, isAdmin } = require('../middlewares/authMiddleware')
const Certs = require('../models/certModel')

const router = express.Router()

router.route('/').get(protect, getCerts)
router.route('/create').post(protect, createCert)
router
  .route('/:id')
  .get(getCertById)
  .put(protect, updateCert)
  .delete(protect, deleteCert)

  router.post('/', async (req, res) => {
    try {
      console.log(req, res)
      const certs = await Certs.find({ user: req.query.certOwner })
      res.json(certs)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })
  

module.exports = router
