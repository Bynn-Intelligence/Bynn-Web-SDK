// types.ts
export interface Person {
    givenName?: string;
    lastName?: string;
    first_name?: string;
    last_name?: string;
    email_address?: string;
    phone_number?: string;
    unique_id?: string;
    phone_country?: string;
}

export interface BynnParams {
    person: Person;
    vendorData?: string;
}

export interface BynnConfig {
    host?: string;
    apiKey: string;
    kycLevel: string;
    parentId: string;
    i18n?: string;
    fields?: FormField[];
    onSession?: (error: Error | null, response: SessionResponse | null, sessionId?: string) => void;
    onCancel?: (sessionId: string) => void;
    onComplete?: (sessionId: string) => void;
    onError?: (sessionId: string, error: string | Error) => void;
    onStart?: (sessionId: string) => void;
    startTimeoutSeconds?: number;
    onReject?: (sessionId: string) => void;
    onSuccess?: (sessionId: string) => void;
    onClose?: () => void;
}

export interface FormOptions {
    formLabel?: {
        vendorData?: string;
    };
    loadingText?: string;
    submitBtnText?: string;
}

export interface FormField {
    name: keyof Person;
    visible?: boolean;
    value?: string;
    label?: string;
}

export interface SessionResponse {
    url: string;
    sessionId: string;
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

export interface BynnSDK {
    params: BynnParams;
    setParams: (newParams: Partial<BynnParams>) => void;
    mount: (options?: FormOptions) => void;
}

export type VerificationStatus =
  | 'timeout'
  | 'cancel'
  | 'completed'
  | 'error'
  | 'start'
  | 'rejected'
  | 'successful';

export interface VerificationMessage {
    type: 'bynn-verification';
    status: VerificationStatus;
    sessionId: string;
    error?: string | Error;
}
