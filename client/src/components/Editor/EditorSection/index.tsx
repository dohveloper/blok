import styled from 'styled-components';
import EditorHeader from './EditorHeader';
import EditorPreivew from './EditorPreview';

const Container = styled.div`
    min-width: 345px;
    flex-grow: 1;
    background-color: #f5f5f8;
    display: flex;
`;

export default Article;
function Article() {
    return (
        <Container>
            <EditorHeader />
            <EditorPreivew />
        </Container>
    );
}
