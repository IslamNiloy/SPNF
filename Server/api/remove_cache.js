import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.put(`${process.env.BACKEND_URL}/format/remove/cache/all`);
    res.status(200).json({ message: 'PUT request to /format/remove/cache/all successful', data: response.data });
  } catch (error) {
    console.error('Error in /format/remove/cache/all:', error);
    res.status(500).json({ error: 'Failed to make PUT request to /format/remove/cache/all' });
  }
}
