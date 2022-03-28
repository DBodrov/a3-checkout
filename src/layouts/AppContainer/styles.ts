import styled from '@emotion/styled';

export const Layout = styled.main`
  position: relative;
  @media (min-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    max-width: 460px;
    margin: auto;
    padding-top: 1rem;

  }
  @media (min-width: 992px) {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 920px;
    margin: auto;
    padding-top: 2rem;
  }

`;
