import { BynnParams, SessionResponse } from '../types';

export async function createSession(
    host: string,
    kycLevel: string,
    apiKey: string,
    params: BynnParams,
    i18n?: string
): Promise<SessionResponse> {
  try {
    if (!params || !params.person) {
      throw new Error('Invalid params: person data is required');
    }

    const response = await fetch(`${host}/v1/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'x-origin': 'js-sdk'
      },
      body: JSON.stringify({
        kyc_level: kycLevel,
        first_name: params.person?.first_name || params.person?.givenName || '',
        last_name: params.person?.last_name || params.person?.lastName || '',
        unique_id: params.person?.unique_id || '',
        phone_number: params.person?.phone_number || '',
        phone_country: params.person?.phone_country || '',
        email_address: params.person?.email_address || '',
        i18n: i18n || undefined,
        vendor_data: params.vendorData || ''
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Session creation failed');
    }

    const data = await response.json();
    console.log('Session response:', data);

    return {
      url: data.url,
      sessionId: data.session_id
    };
  } catch (error) {
    console.error('Session creation error:', error);
    throw error;
  }
}

