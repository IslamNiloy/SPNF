import { bulk_Check_PhoneNumberApiCallCount } from '../controllers/Logic/packageConditions';

export default async function handler(req, res) {
  try {
    bulk_Check_PhoneNumberApiCallCount();
    res.status(200).json({ message: 'PUT request to /format/bulk/update/check_phone_number successful', data: response.data });
  } catch (error) {
    console.error('Error in /format/bulk/update/check_phone_number:', error);
    res.status(500).json({ error: 'Failed to make PUT request to /format/bulk/update/check_phone_number' });
  }
}
