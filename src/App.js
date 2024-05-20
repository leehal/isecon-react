import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Goods from "./pages/goods/goods";
import LOGIN from "./pages/login/login";
import MyPage from "./pages/myPage/myPage";
import Consert from "./pages/consert/consert";
import GlobalStyle from "./global";
import GoodsDetail from "./pages/goods/goodsdetail";
import UserStore from "./UserStore";
import Cart from "./pages/cart/cart";
import UserUpdateFrom from "./pages/myPage/myInfoChange";
import Signup from "./pages/login/sign";

function App() {
  return (
    <>
      <UserStore>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<LOGIN />} />
            <Route path="/goods" element={<Goods />} />
            <Route path="/goodsdetail" element={<GoodsDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/consert" element={<Consert />} />
            <Route path="/userupdatefrom" element={<UserUpdateFrom />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
