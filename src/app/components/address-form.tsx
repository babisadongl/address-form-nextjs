'use client';

import { useEffect, useState } from 'react';
import { STATE_LIST } from '../constants/state-list'
import { Errors } from '../interface/validate-form-error';
import { validateForm } from '../validations/address-form-validation';
import { useLazyQuery, useQuery } from '@apollo/client';
import { VALIDATE_ADDRESS_QUERY } from '../query/address-query';

const AddressForm = () => {
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [successFormMessage, setSuccessFormMessage] = useState('');
  const [result, setResult] = useState([]);
  let [errors, setErrors] = useState<Errors>({
    suburb: { valid: true, message: '' },
    postcode: { valid: true, message: '' },
    state: { valid: true, message: '' },
    errorMessage: ''
  });

  const { refetch } = useQuery(VALIDATE_ADDRESS_QUERY, {
    variables: { postcode, suburb, state },
    skip: true, // Skip the initial query
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formError = validateFormData()
    if(!formError.hasError) {
      try {
        let { data } = await refetch({ postcode, suburb, state });
        if(data) {
          setResult(data?.validateAddress?.data?.localities?.locality)
        }
      } catch (err) {
        setErrors({ ...errors, errorMessage: 'There was an error submitting the form.', hasError: true });
        console.log(errors)
      }
    }
  }

  const validateFormData = () => {
    const updatedErrors = validateForm(suburb, postcode, state)
    if(!updatedErrors.hasError) {
        setSuccessFormMessage('The form inputs are valid.')
    }
    setErrors(updatedErrors)
    return updatedErrors
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Address Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="suburb" className="block text-sm font-medium text-gray-600">Suburb</label>
          <input
            type="text"
            id="suburb"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            onBlur={() => validateFormData()}
            className={`w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 ${!errors.suburb.valid ? 'border-red-500' : ''}`}
            placeholder="Enter suburb"
          />
          {!errors.suburb.valid && <p className="text-red-500 text-sm mt-1">{errors.suburb.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-600">Postcode</label>
          <input
            type="text"
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            onBlur={() => validateFormData()}
            className={`w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 ${!errors.postcode.valid ? 'border-red-500' : ''}`}
            placeholder="Enter postcode"
          />
          {!errors.postcode.valid && <p className="text-red-500 text-sm mt-1">{errors.postcode.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-gray-600">State</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            onBlur={() => validateFormData()}
            className={`w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 ${!errors.state.valid ? 'border-red-500' : ''}`}
          >
            <option value="">Select State</option>
            {STATE_LIST.map((stateOption, index) => (
              <option key={index} value={stateOption.value}>{stateOption.label}</option>
            ))}
          </select>
          {!errors.state.valid && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>

        {errors.hasError && errors.errorMessage && <p className="text-red-500 text-sm mt-1">{errors.errorMessage}</p>}
        {!errors.hasError && successFormMessage && <p className="text-green-500 text-sm mt-1">{successFormMessage}</p>}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Fetch Localities
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
