import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { useEffect } from "react";
import { supabase } from "./utils/supabase";
import { Chat } from "./pages/Chat/Chat";
import Layout from "./component/templetes/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import theme from "./style/theme";

// type countryType = {
//   id: number;
//   name: string;
// };

function App() {
  // const [countries, setCountries] = useState<countryType[] | null>(null);
  useEffect(() => {
    // アプリケーションが動いている間はセッションを常に監視する。
    // セッションが切れた場合は/Loginにリダイレクト。
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && window.location.pathname !== "/login") {
        window.location.pathname = "/login";
      }
    });
    // getCountries();
  }, []);

  // async function getCountries() {
  //   const { data } = await supabase.from("countries").select();
  //   setCountries(data);
  // }

  return (
    // <ul>
    //   {countries &&
    //     countries.map((country) => (
    //       <li key={country?.name}>{country?.name}</li>
    //     ))}
    // </ul>
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
