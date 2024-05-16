import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Goods from "./pages/goods/goods";
import LOGIN from "./pages/login/login";
import MyPage from "./pages/myPage/myPage";
import Consert from "./pages/consert/consert";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LOGIN />} />
          <Route path="/goods" element={<Goods />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/consert" element={<Consert />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
