import styled from '@emotion/styled';

export const Page = styled.main`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 704px;
  height: 100%;
  background-color: transparent;
  padding: 1rem;
  margin: auto;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

export const ViewCard = styled.article`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-width: 704px;
  min-height: 10rem;
  padding: 1.5rem;
  @media (max-width: 425px) {
    padding: 0.5rem;
  }
  background-color: var(--color-background);
  box-shadow: 0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32);
  border-radius: 6px;
`;

export const Screen = styled.main`

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(425px, 1fr));
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
`
export const PageLayout = styled.main`
  position: relative;
  @media (min-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 460px;
    margin: auto;
    padding-top: 1rem;

  }
  @media (min-width: 992px) {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 920px;
    margin: auto;
    padding-top: 2rem;
  }

`;
