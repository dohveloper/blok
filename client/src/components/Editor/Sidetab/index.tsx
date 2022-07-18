import styled from 'styled-components';
import SideTabHeader from './SidetabHeader';
import SidetabContent from './SidetabContent';

const Container = styled.div`
  width: 440px;
  height: 100%;
  margin-left: 74px;
  flex-shrink: 0;
  background-color: #f5f5f8;
  border-right: 1px solid #d1d1d1;
  display: flex;
  flex-direction: column;
`;

export default function Sidetab() {
  return (
    <Container>
      <SideTabHeader />
      <SidetabContent />
    </Container>
  );
}
