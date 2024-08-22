import { createTheme, ThemeProvider } from "@mui/material";
import Routing from "./Routing";


function App() {

  const theme = createTheme({});

  return (
    <>
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
    </>
  )
}

export default App
