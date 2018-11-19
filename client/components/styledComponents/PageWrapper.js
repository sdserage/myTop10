import styled from 'styled-components';

const PageWrapper = styled.section`
  padding: ${props => props.theme._spacer()};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default PageWrapper;