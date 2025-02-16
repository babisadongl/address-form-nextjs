import { LOCATION_DETAIL_LIST } from '../constants/location-detail-list';
import { STATE_LIST } from '../constants/state-list';
import { Errors } from '../interface/validate-form-error';

export const validateForm = (suburb: string, postcode: string, state: string) => {
    let hasError: boolean = false
    let errors: Errors = {
        suburb: {valid: true, message: ''},
        postcode: {valid: true, message: ''},
        state: { valid: true, message: '' },
        errorMessage: ''
    };
    const fieldValidationData = validateFields(suburb, postcode, errors, hasError)
    errors = fieldValidationData.errors
    hasError = fieldValidationData.hasError
    if(!hasError) {
        const valueValidationData = validateValues(suburb, postcode, state, hasError)
        if(valueValidationData.hasError) {
            errors.errorMessage = valueValidationData.errorMessage
        }
    } 
    
    return errors
  };

  export const validateFields = (suburb: string, postcode: string, errors: Errors, hasError: boolean) => {
    if (!suburb && !postcode) {
        errors.suburb.valid = false;
        errors.postcode.valid = false;
        errors.suburb.message = 'Suburb or Postcode is required.';
        errors.postcode.message = 'Postcode or Suburb is required.';
        hasError = true
    } else {
        if(postcode && !/^\d{4}$/.test(postcode)) { // Post code must be 4 digit
            errors.postcode.valid = false
            errors.postcode.message = 'Postcode must be a 4-digit number.';
            hasError = true
        } 
    }

    if (!hasError) {
        errors.suburb = { valid: true, message: '' };
        errors.postcode = { valid: true, message: '' };
    }
    
    return { errors, hasError };
  }

  const validateValues = (suburb: string, postcode: string, state: string, hasError: boolean) => {
    let errorMessage: string = ''
    let data: any
    const stateLabel = STATE_LIST.find((s: any) => s.value.toLowerCase() == state.toLowerCase())?.label
    if(suburb && postcode && state){
        data = LOCATION_DETAIL_LIST.find(location => location.suburb.toLowerCase() == suburb.toLowerCase() && location.postcode == +postcode && location.state.toLowerCase() == state.toLowerCase())
        if(!data) {
            hasError = true
            errorMessage = `The postcode ${postcode}, suburb ${suburb} and state ${stateLabel}  do not correspond with each other.`
        }
    } else if (suburb && postcode) {
        data = LOCATION_DETAIL_LIST.find(location => location.suburb.toLowerCase() == suburb.toLowerCase() && location.postcode == +postcode)
        if(!data) {
            hasError = true
            errorMessage = `The postcode ${postcode} is not associated with the suburb ${suburb}.`
        }
    } else if (state && postcode) {
        data = LOCATION_DETAIL_LIST.find(location => location.postcode == +postcode && location.state.toLowerCase() == state.toLowerCase())
        if(!data) {
            hasError = true
            errorMessage = `The postcode ${postcode} is not associated with the state ${stateLabel}.`
        }
    } else if (suburb && state) {
        data = LOCATION_DETAIL_LIST.find(location => location.suburb.toLowerCase() == suburb.toLowerCase() && location.state.toLowerCase() == state.toLowerCase())
        if(!data) {
            hasError = true
            errorMessage = `The suburb ${suburb} does not exist in the state ${stateLabel}`
        }
    }

    return { hasError, errorMessage}
  }
