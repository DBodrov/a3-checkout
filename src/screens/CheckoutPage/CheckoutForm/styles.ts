import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
  padding: 1rem;
  box-shadow: var(--card-shadow);
`;

export const Label = styled.label`
  width: 100%;
  font-size: 0.87rem;
  color: var(--color-text-secondary);
`;
