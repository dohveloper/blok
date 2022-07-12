import { AppRouter } from "./Router";
import { ThemeProvider } from "styled-components";

function App() {
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
      </ThemeProvider>
    </div>
  );
}

export default App;
