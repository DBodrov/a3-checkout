import React from 'react';
import {Radio} from '@a3/frontkit';
import {TField} from '@/context/CheckoutProvider/types';
import {Label} from './styles';

type TProps = {
  field: TField;
  onChange: (field: string, paymentType: string) => void;
  checkedField?: string;
};

export function PaymentTypeRadio(props: TProps) {
  const {field, onChange, checkedField} = props;

  const handleChangeType = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(field.name, value);
    },
    [field.name, onChange],
  );

  return (
    <Label htmlFor={field.name}>
      {field.description}
      {field.radio?.item.map(r => {
        return (
          <Radio
            key={r.name}
            value={r.name}
            name={field.name}
            onChange={handleChangeType}
            checked={checkedField === r.name}>
            <span css={{fontSize: '1rem'}}>{r.description}</span>
          </Radio>
        );
      })}
    </Label>
  );
}
