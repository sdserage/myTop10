import styled from 'styled-components';

const PageWrapper = styled.section`
  padding: ${props => props.theme._spacer()};
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${props => props.theme.darkColor};
  h1 {
    margin-bottom: ${props => props.theme._spacer()};
    color: inherit;
  }
`;

export default PageWrapper;