import { BynnParams } from './types';

export async function createSession(
  host: string,
  apiKey: string,
  params: BynnParams
): Promise<any> {
  const response = await fetch(`${host}/v1/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-client': apiKey,
      'x-origin': 'js-sdk'
    },
    body: JSON.stringify({
      verification: {
        person: {
          firstName: params.person.givenName,
          lastName: params.person.lastName
        },
        vendorData: params.vendorData,
        timestamp: new Date().toISOString()
      }
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
