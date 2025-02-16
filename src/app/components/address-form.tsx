'use client';

import { useState } from 'react';
import { STATE_LIST } from '../constants/state-list'
import { Errors } from '../interface/validate-form-error';

const AddressForm = () => {
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState<Errors>({
    suburb: { valid: true, message: '' },
    postcode: { valid: true, message: '' },
    state: { valid: true, message: '' },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    validateForm()
  }

  const validateForm = () => {
    const errors: Errors = {
        suburb: {valid: true, message: ''},
        postcode: {valid: true, message: ''},
        state: {valid: true, message: ''},
    };
    // Object.keys(errors).forEach((x) => validateField(x))
    if (!suburb && !postcode) {
        errors.suburb.valid = false;
        errors.postcode.valid = false;
        errors.suburb.message = 'Suburb or Postcode is required.';
        errors.postcode.message = 'Postcode or Suburb is required.';
        
    }

    if(postcode && !/^\d{4}$/.test(postcode)) { // Post code must be 4 digit
        errors.postcode.valid = false
        errors.postcode.message = 'Postcode must be a 4-digit number.';
    }

    if (!state) {
        errors.state.valid = false;
        errors.state.message = 'State is required.';
    }
    
    setErrors(errors);
    return Object.keys(errors).find((x) => !errors[x as keyof Errors].valid);
  };

//   const validateField = (field: string) => {
//     const newErrors: Errors = { ...errors };

//     switch (field) {
//       case 'suburb':
//         if (!suburb && !postcode) {
//           newErrors.suburb.valid = false;
//           newErrors.suburb.message = 'Suburb or Postcode is required.';
//         } else {
//             newErrors.suburb.valid = true
//             newErrors.postcode.valid = true
//         }
//         break;
//       case 'postcode':
//         if (!suburb && !postcode) {
//             newErrors.suburb.valid = false;
//             newErrors.suburb.message = 'Postcode or Suburb is required.';
//           }
//         else{
//             newErrors.suburb.valid = true
//             newErrors.postcode.valid = true
//         }
//         if (postcode && !/^\d{4}$/.test(postcode)) {
//             newErrors.postcode.valid = false;
//             newErrors.postcode.message = 'Postcode must be a 4-digit number.';
//         }
//         break;
//       case 'state':
//         if (!state) {
//             newErrors.state.valid = false;
//             newErrors.state.message = 'State is required.';
//         } else {
//             newErrors.state.valid = true
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors(newErrors);
//   };


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
            // onKeyDown={() => validateForm('suburb')}
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
            // onKeyDown={() => validateForm('postcode')}
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
            // onKeyDown={() => validateForm('state')}
            className={`w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200 ${!errors.state.valid ? 'border-red-500' : ''}`}
          >
            <option value="">Select State</option>
            {STATE_LIST.map((stateOption, index) => (
              <option key={index} value={stateOption.value}>{stateOption.label}</option>
            ))}
          </select>
          {!errors.state.valid && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
