import { fail } from '@/lib/api-response';

export function handleApiError(error: unknown, fallbackMessage = 'Internal server error') {
  if (error instanceof Error) {
    return fail(error.message, 500);
  }

  return fail(fallbackMessage, 500);
}
