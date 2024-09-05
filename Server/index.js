require('dotenv').config();
let { ConnectDB, disconnectDB} = require('./utils/mongo.connection');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dataFormatterRoutes = require('./routes/dataFormatterRoutes');
const hubspotRoutes = require('./routes/hubspotRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRouters = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const packageRouters = require('./routes/packageRoute');
const logger = require('./utils/logger'); // Add logger
const setupSwagger = require('./swagger');
const bodyParser = require('body-parser');
const { getAsync } = require('./controllers/Logic/bulkCountInsertion');
const app = express();
const PORT = process.env.PORT || 3000;
const cron = require('node-cron');
const { processStart } = require('./controllers/dataSyncController');

// Use CORS middleware
app.use(cors());
/* 
  ////STRIPE WEBHOOK MUST BE HANDLED BEFORE ANY JSON{} DATA IS PARSED FROM SERVER 
*/
app.use('/stripe', paymentRoutes);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: Math.random().toString(36).substring(2),
  resave: false,
  saveUninitialized: true
}));

app.use('/', hubspotRoutes);
app.use('/format', dataFormatterRoutes);
app.use('/charge', paymentRoutes);
app.use('/user', userRouters);
app.use('/subscribe', subscriptionRoutes);
app.use('/package', packageRouters);


// Setup Swagger
setupSwagger(app);

async function loadDatabaseConnection() {
  await ConnectDB();
  app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
}

loadDatabaseConnection();

setInterval(getAsync,  60 * 60 * 1000); 


// cron.schedule('*/5 * * * *', async () => {
//   console.log('Cron job started: Syncing subscriptions to HubSpot');
//   logger.info('Cron job started: Syncing subscriptions to HubSpot');
//   await processStart()
// });