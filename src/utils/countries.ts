import countriesData from './countries.json';

export interface Country {
  name: string;
  dial_code: string;
  emoji: string;
  code: string;
}

export const countries: Country[] = countriesData;

