const express = require('express')
const authrouter = require('./routes/authRoute.js')
const userRouter = require('./routes/userRoute.js')
const contactrouter = require('./routes/contactRoute.js')
const leadrouter = require('./routes/leadRoute.js')
const cors = require('cors')
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./db/db.js')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


//middlewares
app.use(cors());
app.use(bodyParser.json());


// Sync database
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

    app.use('/api/auth', authrouter);
    app.use('/api/users', userRouter);
    app.use('/api/contacts', contactrouter);
    app.use('/api/leads', leadrouter);

const PORT =  3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

