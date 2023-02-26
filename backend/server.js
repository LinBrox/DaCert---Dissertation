const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const certRoutes = require('./routes/certRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const { isAdmin } = require('./middlewares/authMiddleware');
const User = require('./models/userModel');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/',(req,res) =>{
    res.send("API is running");
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

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
//Theres a line of code in package.json under SCRIPTS that let's us just type npm start in the terminal and it runs the server and the file
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));