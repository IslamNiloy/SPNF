import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {  // This will be called by Vercel cron as a GET request
    try {
      // Make an internal PUT request to your backend
      const response = await axios.put(`${process.env.BACKEND_URL}/format/bulk/update/check_phone_number`);

      // Return the result
      res.status(200).json({ message: 'PUT request to /format/bulk/update/check_phone_number successful', data: response.data });
    } catch (error) {
      console.error('Error in PUT request to /format/bulk/update/check_phone_number:', error);
      res.status(500).json({ error: 'Failed to make PUT request to /format/bulk/update/check_phone_number' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
