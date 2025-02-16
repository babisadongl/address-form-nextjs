export type FieldError = {
    valid: boolean;
    message: string;
  };
  
 export type Errors = {
    suburb: FieldError;
    postcode: FieldError;
    state: FieldError;
    // successMessage?: string;
    errorMessage?: string;
    // hasError?: boolean
  };
  