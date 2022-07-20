import { AppRouter } from './Router';
import { ThemeProvider } from 'styled-components';
import ConfirmModal from './components/ConfirmModal';
import AlertModal from './components/AlertModal';
import { useAppSelector } from './reducers';

function App() {
  const AlertModalState = useAppSelector((state) => state.alertReducer.state);
  const alertData = useAppSelector((state) => state.alertReducer.alertData);
  const ConfirmModalState = useAppSelector(
    (state) => state.modalReducer.isConfirmModal
  );
  const confirmData = useAppSelector((state) => state.modalReducer.confirmData);

  return (
    <div className="App">
      <ThemeProvider
        theme={{
          palette: {
            black: '#282828',
            gray: '#949494',
            white: '#FFFFFF',
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
