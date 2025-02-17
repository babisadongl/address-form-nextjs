interface SuccessMessageProps {
    successMessage: string | undefined;
  }
  
  const SuccessMessage = ({ successMessage }: SuccessMessageProps) => {
    return successMessage ? <p className="text-green-500 text-sm mt-1">{successMessage}</p> : null;
  };
  
  export default SuccessMessage;
  