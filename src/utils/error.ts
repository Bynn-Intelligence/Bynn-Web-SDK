export class BynnError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'BynnError';
  }
}

export function handleApiError(error: unknown): BynnError {
  if (error instanceof Error) {
    return new BynnError(error.message, 'API_ERROR');
  }
  return new BynnError('An unexpected error occurred', 'UNKNOWN_ERROR');
}
