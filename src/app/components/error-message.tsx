interface ErrorMessageProps {
    errorMessage: string | undefined;
  }
  
  const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
    return errorMessage ? <p className="text-red-500 text-sm mt-1">{errorMessage}</p> : null;
  };
  
  export default ErrorMessage;
  