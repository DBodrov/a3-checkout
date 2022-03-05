import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
display: flex;
flex-flow: column nowrap;
padding: 1rem;

@media (max-width: 600px) {
  max-width: 380px;
  margin: auto;
}

@media (min-width: 600px) {
  width: 460px;
  margin: auto;
}

@media (min-width: 768px) {
  width: 460px;
  margin: auto;
}

@media (min-width: 992px) {
  width: 920px;
  margin: auto;
}
`;
