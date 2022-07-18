import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../Button';
import { TextInput } from '../../Input';
import { useParams, useNavigate } from 'react-router';
import { RootState } from '../../../reducers';

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  padding: 0.01px 20px 20px 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
`;

export default function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.site);
  const [domain, setDomain] = useState(data.domain);

  const { siteId } = useParams();

  const deleteHandler = () => {
    console.log(siteId);
    dispatch({
      type: 'CONFIRM/MODAL_ON',
      payload: {
        title: '삭제',
        msg: '정말 삭제하시겠습니까?',
        action: 'deleteSite',
      },
    });
  };

  const modalAction = useSelector(
    (state: RootState) => state.modalReducer.confirmData
  );

  const deleteSite = async () => {
    try {
      await axios.delete(`/api/site/${siteId}`);
      dispatch({ type: 'CONFIRM/MODAL_OFF' });
      dispatch({
        type: 'alertOn',
        payload: { msg: '사이트가 삭제되었습니다.' },
      });
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  if (modalAction?.action === 'deleteSite') {
    deleteSite();
  }

  return (
    <>
      <Container>
        <TextInput
          title="도메인"
          required={true}
          value={domain}
          guideline="도메인을 변경할 수 있습니다."
          onChange={(e: any) => setDomain(e.target.value)}
        ></TextInput>
      </Container>
      <ButtonContainer>
        <Button
          onClick={() => deleteHandler()}
          color="black"
          size="large"
          rounding
          fullWidth
        >
          사이트 삭제
        </Button>
      </ButtonContainer>
    </>
  );
}
