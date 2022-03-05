import React from 'react';
import {usePayment} from '@/context';
import {Span} from '@a3/frontkit';

import {ArrowIcon} from '@/assets/icons';
import {StyledSection} from './styles';
import {isEmptyString} from '@/utils/string.utils';

type TProps = {
  children: React.ReactNode;
  withBackward?: boolean;
  transactionId?: string;
};

function LinkBackward() {
  const {info: {config}} = usePayment();
  const {companyName = '', homeUrl = '', logo = ''} = config;

  if (isEmptyString(homeUrl)) {
    return null;
  }

  return (
    <div css={{display: 'flex', flexFlow: 'row nowrap'}}>
      <a
        href={homeUrl}
        rel="noopener noreferrer"
        css={{
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
        }}>
        <ArrowIcon />
        <img src={logo} alt={companyName} css={{height: 70, maxWidth: 128}} />
        <Span>{companyName}</Span>
      </a>
    </div>
  );
}

export function Section(props: TProps) {
  const {children, withBackward, ...restProps} = props;

  return (
    <StyledSection {...restProps}>
      {withBackward ? <LinkBackward /> : null}
      {children}
    </StyledSection>
  );
}
