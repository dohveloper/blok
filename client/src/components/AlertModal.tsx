import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertBox = styled.div`
  background-color: white;
  opacity: 1;
  padding: 20px 40px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  font-weight: 550;
`;

const InnerBox = styled.div`
  margin-top: 20px;
`;

interface IMyProps {
  alertData: any;
}

export default function AlertModal(props: IMyProps) {
  const dispatch = useDispatch();
  const time = props.alertData.time ? props.alertData.time : 600;

  setTimeout(() => {
    dispatch({ type: 'alertOff' });
  }, time);

  return (
    <Background>
      <AlertBox id="alert">
        {props.alertData.msg}
        {props.alertData.link && (
          <InnerBox>
            <Link
              to={{
                pathname: `/${props.alertData.link}`,
              }}
              style={{ textDecoration: 'none' }}
            >
              <Button color="white" size="large" rounding>
                페이지로 이동
              </Button>
            </Link>
          </InnerBox>
        )}
      </AlertBox>
    </Background>
  );
}
