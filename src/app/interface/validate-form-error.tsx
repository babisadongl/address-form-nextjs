export type FieldError = {
    valid: boolean;
    message: string;
  };
  
 export type Errors = {
    suburb: FieldError;
    postcode: FieldError;
    state: FieldError;
    errorMessage?: string;
    hasError?: boolean
  };
  