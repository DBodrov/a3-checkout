import styled from '@emotion/styled';

export const StyledSection = styled.section`
  height: 100%;
  @media (max-width: 600px) {
    max-width: 380px;
    margin: auto;
    padding: 1rem;
  }

  @media (min-width: 600px) {
    width: 100%;
    max-width: 460px;
    padding: 1rem;
    margin: auto;
  }
  @media (min-width: 768px) {
    width: 100%;
    max-width: 460px;
    padding: 1rem;
    margin: auto;
  }

  @media (min-width: 992px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    max-width: 460px;
    padding: 1rem;
    margin: 0;
  }
`;
