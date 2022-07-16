import { AppRouter } from "./Router";
import { ThemeProvider } from "styled-components";
import ConfirmModal from "./components/ConfirmModal";
import AlertModal from "./components/AlertModal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const AlertModalState = useSelector((state: any) => state.alertReducer.state);
  const alertData = useSelector((state: any) => state.alertReducer.alertData);
  const ConfirmModalState = useSelector(
    (state: any) => state.modalReducer.isConfirmModal
  );
  const confirmData = useSelector(
    (state: any) => state.modalReducer.confirmData
  );

  // 로그인 유저 정보 redux로 관리
  const dispatch = useDispatch();

  const checkLoginUser = async () => {
    const res = await axios.get("/api/user/logincheck");
    const user = res.data;
    dispatch({
      type: "USER/LOGIN",
      payload: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        userName: user.userName,
        oauth: user.oauth,
        passwordReset: user.passwordReset,
        profileImage: user.profileImage,
        plan: user.plan,
      },
    });
  };

  useEffect(() => {
    checkLoginUser();
  }, []);

  return (
    <div className="App">
      <ThemeProvider
        theme={{
          palette: {
            black: "#282828",
            gray: "#949494",
            white: "#FFFFFF",
          },
        }}
      >
        <AppRouter />
        {AlertModalState && <AlertModal alertData={alertData} />}
        {ConfirmModalState && <ConfirmModal confirmData={confirmData} />}
      </ThemeProvider>
    </div>
  );
}

export default App;
