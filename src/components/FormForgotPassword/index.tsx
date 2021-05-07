import { useState } from 'react';
import {
  CheckCircleOutline,
  Email,
  ErrorOutline
} from '@styled-icons/material-outlined';

import Button from 'components/Button';
import {
  FormLoading,
  FormWrapper,
  FormError,
  FormSuccess
} from 'components/Form';
import TextField from 'components/TextField';

import { FieldErrors, forgotValidate } from 'utils/validations';

const FormForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: '' });

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const errors = forgotValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({});

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }
    );

    const data = await response.json();
    setLoading(false);

    if (data.error) {
      setFormError(data?.message[0]?.messages[0]?.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline />
          You just received an email!
        </FormSuccess>
      ) : (
        <>
          {!!formError && (
            <FormError>
              <ErrorOutline /> {formError}
            </FormError>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              placeholder="Email"
              type="text"
              error={fieldError.email}
              onInputChange={(v) => handleInput('email', v)}
              icon={<Email />}
            />

            <Button type="submit" size="large" fullWidth disabled={loading}>
              {loading ? <FormLoading /> : <span>Send email</span>}
            </Button>
          </form>
        </>
      )}
    </FormWrapper>
  );
};

export default FormForgotPassword;