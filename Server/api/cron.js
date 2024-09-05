// api/cron.js

const { processStart } =  require('../controllers/dataSyncController');

module.exports = async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  try {
    console.log('Cron job started: Syncing subscriptions to HubSpot');
    await processStart();
    res.status(200).end('Subscriptions synced successfully');
  } catch (error) {
    console.error('Error syncing subscriptions:', error);
    res.status(500).end('Failed to sync subscriptions');
  }
};

