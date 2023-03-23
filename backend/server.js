const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const certRoutes = require('./routes/certRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const { isAdmin, protect } = require('./middlewares/authMiddleware');
const User = require('./models/userModel');
const path = require('path');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.delete('/api/users/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/users/all', async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


app.get('/api/certTest', (req,res) => {
    res.json(certTest);
});

app.use('/api/users', userRoutes);
app.use('/api/certs', certRoutes);

// Deployment
__dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  })
} else{
  app.get('/',(req,res) =>{
  res.send("API is running");
});

}


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
//Theres a line of code in package.json under SCRIPTS that let's us just type npm start in the terminal and it runs the server and the file
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));