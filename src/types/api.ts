export type ApiResponse<T> = {
  value: T;
  isSuccess: boolean;
  successMessage: string;
  errors: string[];
  validationErrors: string[];
};

export type HookResponse<T> =
  | {
      type: 'loading';
    }
  | { type: 'success'; value: T }
  | { type: 'error'; error: Error };
