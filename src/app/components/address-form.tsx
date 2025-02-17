'use client';

import { useState } from 'react';
import { STATE_LIST } from '../constants/state-list'
import { Errors } from '../interface/validate-form-error';
import { validateForm } from '../validations/address-form-validation';
import { useQuery } from '@apollo/client';
import { VALIDATE_ADDRESS_QUERY } from '../query/address-query';
import { ApiResult } from '../interface/result';
import InputField from './input-field';
import ErrorMessage from './error-message';
import SuccessMessage from './success-message';
import ResultTable from './result-table';

const AddressForm = () => {
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [successFormMessage, setSuccessFormMessage] = useState('');
  const [result, setResult] = useState<ApiResult[]>([]);
  const [errors, setErrors] = useState<Errors>({
    suburb: { valid: true, message: '' },
    postcode: { valid: true, message: '' },
    state: { valid: true, message: '' },
    errorMessage: ''
  });
  const [showTable, setShowTable] = useState(false);

  const { refetch } = useQuery(VALIDATE_ADDRESS_QUERY, {
    variables: { postcode, suburb, state },
    skip: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formError = validateFormData();
    if (!formError.hasError) {
      try {
        const { data } = await refetch({ postcode, suburb, state });
        setShowTable(true)
        if (data) {
          setResult(data?.validateAddress?.data?.localities?.locality || []);
        }
      } catch (err) {
        setErrors({ ...errors, errorMessage: 'There was an error submitting the form.', hasError: true });
        console.log(errors);
      }
    }
  };

  const validateFormData = () => {
    const updatedErrors = validateForm(suburb, postcode, state);
    if (!updatedErrors.hasError) {
      setSuccessFormMessage('The form inputs are valid.');
    }
    setErrors(updatedErrors);
    return updatedErrors;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Location Information Form</h2>

      <form onSubmit={handleSubmit}>
        <InputField 
          label="Suburb"
          id="suburb"
          value={suburb}
          onChange={setSuburb}
          errors={errors.suburb}
          onBlur={() => validateFormData()}
        />
        <InputField 
          label="Postcode"
          id="postcode"
          value={postcode}
          onChange={setPostcode}
          errors={errors.postcode}
          onBlur={() => validateFormData()}
        />
        <InputField 
          label="State"
          id="state"
          value={state}
          onChange={setState}
          errors={errors.state}
          onBlur={() => validateFormData()}
          isSelect
          options={STATE_LIST}
        />

        {errors.hasError ? (
            <ErrorMessage errorMessage={errors.errorMessage} />
        ) : null}
        {!errors.hasError ? (
            <SuccessMessage successMessage={successFormMessage} />
        ) : null}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Fetch Localities
          </button>
        </div>
      </form>
      {showTable ? (
          <ResultTable result={result} />
      ) : null}
    </div>
  );
};

export default AddressForm;
