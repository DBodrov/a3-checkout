import React from 'react';
import {PhoneIcon} from '@/assets/icons';
import {Span} from '@a3/frontkit';
import {StyledFooter} from './styles';

export function Footer() {
  return (
    <StyledFooter>
      <Span css={{color: 'var(--color-text-secondary)', fontSize: '0.75rem'}}>
        "Услугу по Переводу денежных средств с использованием Платежного сервиса А3 оказывает ПАО
        "Промсвязьбанк", лицензия Банка России №3251"
      </Span>
      <div css={{display: 'flex', flexFlow: 'row nowrap', gap: 8, alignItems: 'center', paddingTop: 8}}>
        <PhoneIcon />
        <Span css={{color: 'var(--color-text-secondary)', fontSize: '0.75rem'}}>+7 (999) 54 - 12 - 589</Span>
      </div>
    </StyledFooter>
  );
}
