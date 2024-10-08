import { bulkPhoneNumberApiCallCount } from '../controllers/Logic/packageConditions';

export default async function handler(req, res) {
  try {
    // PUT request to your backend service
    bulkPhoneNumberApiCallCount();
    
    // Respond with the result
    res.status(200).json({ message: 'PUT request to /format/bulk/update/phone_number successful', data: response.data });
  } catch (error) {
    console.error('Error in /format/bulk/update/phone_number:', error);
    res.status(500).json({ error: 'Failed to make PUT request to /format/bulk/update/phone_number' });
  }
}
