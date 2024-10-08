import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.put(`${process.env.BACKEND_URL}/format/bulk/update/check_phone_number`);
    res.status(200).json({ message: 'PUT request to /format/bulk/update/check_phone_number successful', data: response.data });
  } catch (error) {
    console.error('Error in /format/bulk/update/check_phone_number:', error);
    res.status(500).json({ error: 'Failed to make PUT request to /format/bulk/update/check_phone_number' });
  }
}
