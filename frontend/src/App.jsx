import { useState } from "react";
import { Box, ThemeProvider, createTheme, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatUI from "../components/ChatUI";
import Rightbar from "../components/Rightbar";

const App = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        height={"100vh"}
      >
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <ChatUI />
          {/* <Rightbar /> */}
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default App;
