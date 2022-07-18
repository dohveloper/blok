import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../Button';
import { TextInput } from '../../Input';
import { useParams } from 'react-router';
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
  const data = useSelector((state: RootState) => state.site);
  const [domain, setDomain] = useState(data.domain);

  const { siteId } = useParams();

  const deleteHandler = (props: string) => {
    dispatch({
      type: 'CONFIRM/MODAL_ON',
      payload: {
        title: '삭제',
        msg: '정말 삭제하시겠습니까?',
        action: 'deleteSite',
        props: props,
      },
    });
  };

  const modalAction = useSelector(
    (state: RootState) => state.modalReducer.confirmData
  );

  const deleteSite = async () => {
    try {
      console.log('siteId:', modalAction?.props);
      if (modalAction?.props === '') {
        console.log('modolAction의 props를 불러오지 못했습니다.');
        return;
      }
      // 사이트 삭제 API 통신 에러
      await axios.delete(`/api/site/delete/${modalAction?.props}`);
      dispatch({ type: 'CONFIRM/MODAL_OFF' });
      dispatch({ type: 'alertOn', payload: '사이트가 삭제되었습니다.' });
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
          title='도메인'
          required={true}
          value={domain}
          guideline='도메인을 변경할 수 있습니다.'
          onChange={(e: any) => setDomain(e.target.value)}
        ></TextInput>
      </Container>
      <ButtonContainer>
        <Button
          onClick={() => deleteHandler(siteId!)}
          color='black'
          size='large'
          rounding
          fullWidth
        >
          사이트 삭제
        </Button>
      </ButtonContainer>
    </>
  );
}
