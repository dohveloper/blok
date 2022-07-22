import styled from 'styled-components';
import EditorHeader from './EditorHeader';
import EditorPreivew from './EditorPreview';

const Container = styled.div`
  min-width: 345px;
  flex-grow: 1;
  background-color: #f5f5f8;
  display: flex;
  box-sizing: border-box;
  height: 100%;
`;

export default EditorSection;
function EditorSection() {
  return (
    <Container>
      <EditorHeader />
      <EditorPreivew />
    </Container>
  );
}
