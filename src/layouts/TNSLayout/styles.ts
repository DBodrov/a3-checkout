import styled from '@emotion/styled';

export const Layout = styled.main`
  display: grid;
  grid-template: 90px 1fr / 1fr;
  row-gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: var(--color-background-secondary);
`;

export const Content = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-secondary);
  overflow: auto;
`
