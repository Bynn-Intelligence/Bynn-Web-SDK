import countriesData from './countries.json';

export interface Country {
  name: string;
  dial_code: string;
  emoji: string;
  code: string;
}

export const countries: Country[] = countriesData;

// Helper function to get default country (US)
export function getDefaultCountry(): Country {
  return countries.find(country => country.code === 'US') || countries[0];
}

// Helper function to format country option label
export function formatCountryOption(country: Country): string {
  return `${country.emoji} ${country.code} ${country.dial_code}`;
}