import { useState, InputHTMLAttributes } from 'react';

import * as S from './styles';

export type TextFieldProps = {
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  label?: string;
  initialValue?: string;
  onInputChange?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({
  disabled = false,
  error,
  icon,
  iconPosition = 'left',
  initialValue = '',
  label,
  name,
  onInputChange,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);

    !!onInputChange && onInputChange(newValue);
  };

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          type="text"
          onChange={onChange}
          value={value}
          iconPosition={iconPosition}
          disabled={disabled}
          name={name}
          {...(label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
};

export default TextField;
