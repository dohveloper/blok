import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../Button';
import { useParams, useNavigate } from 'react-router';
import { RootState } from '../../../reducers';

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  padding: 15px 20px 30px 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
`;

export const Label = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  margin: 12px 0;
`;

export const Input = styled.input`
  font-size: 16px;
  line-height: 19px;
  width: 80%;
  height: 48px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 15px 19px;
  border-radius: 5px;
  margin-right: 10px;
  @media screen and (max-width: 499px) {
    font-size: 12px;
  }
`;

export default function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.site);

  const [domain, setDomain] = useState(data.domain);

  function editDomainHandler() {
    dispatch({ type: 'site/updateDomain', payload: domain });
  }

  const { siteId } = useParams();

  const deleteHandler = () => {
    dispatch({
      type: 'CONFIRM/MODAL_ON',
      payload: {
        title: '삭제',
        msg: '정말 삭제하시겠습니까!',
        onConfirm: deleteSite,
      },
    });
  };

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

  return (
    <>
      <Container>
        <Label>도메인 수정</Label>
        <Input
          value={domain}
          onChange={(e: any) => setDomain(e.target.value)}
        ></Input>
        <Button
          onClick={() => editDomainHandler()}
          color='black'
          size='medium'
          rounding
        >
          저장
        </Button>
      </Container>
      <ButtonContainer>
        <Button
          onClick={() => deleteHandler()}
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
