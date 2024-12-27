export interface FormField {
  name: keyof Person;
  visible?: boolean;
  value?: string;
  label?: string;
}

export interface Person {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number?: string;
  unique_id?: string;
}

export interface BynnConfig {
  host?: string;
  apiKey: string;
  parentId: string;
  i18n?: string;
  fields?: FormField[];
  onSession?: (error: Error | null, response: SessionResponse | null) => void;
}

export interface SessionResponse {
  url: string;
}

export interface ApiError {
  error: {
    message: string;
    code?: string;
  };
}

export interface IframeOptions {
  width?: string;
  height?: string;
  className?: string;
}