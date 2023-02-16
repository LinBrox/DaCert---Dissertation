const mongoose = require('mongoose')

const certSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    logo: {
      type: String,
      required: true,
      default:
        'https://icon-library.com/images/super-man-icon/super-man-icon-10.jpg',
    },
  },
  {
    timestamps: true,
  },
)

const Certs = mongoose.model('Certs', certSchema)

module.exports = Certs
