import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.put(`${process.env.BACKEND_URL}/format/bulk/update/phone_number`);
      res.status(200).json({ message: 'PUT request to /format/bulk/update/phone_number successful', data: response.data });
    } catch (error) {
      console.error('Error in PUT request to /format/bulk/update/phone_number:', error);
      res.status(500).json({ error: 'Failed to make PUT request to /format/bulk/update/phone_number' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
