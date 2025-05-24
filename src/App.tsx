import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnBoarding from "./pages/beforeLogin/onBoarding";
import Login from "./pages/beforeLogin/login/login";
import Main from "./pages/afterLogin/main/main";
import Mypage from "./pages/afterLogin/mypage/mypage";
import MainLayout from "./pages/afterLogin/mainLayout";
import ScanningQR from "./pages/afterLogin/main/scanningQR";
import Authenticated from "./pages/afterLogin/main/components/authenticated";
import AroundTrash from "./pages/afterLogin/aroundTrash/aronudTrash";
import ChatPage from "./pages/afterLogin/mypage/chatBot/chatPage";
import EditNickName from "./pages/afterLogin/mypage/edtiNickName/editNickName";
import Favorites from "./pages/afterLogin/mypage/favorites/favorites";
import PaymentHistory from "./pages/afterLogin/mypage/paymentHistory/paymentHistory";
import TrashHistory from "./pages/afterLogin/mypage/trashHistory/trashHistory";
import ScrollTop from "./util/scrollTop";
import Store from "./pages/afterLogin/store/Store";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/around-trash" element={<AroundTrash />} />
          <Route path="/store" element={<Store />} />
          <Route path="/mypage" element={<Mypage />} />

          {/* 마이페이지 하위 페이지 */}
          <Route path="/mypage/chat-bot" element={<ChatPage />} />
          <Route path="/mypage/edit-nickname" element={<EditNickName />} />
          <Route path="/mypage/favorites" element={<Favorites />} />
          <Route path="/mypage/payment-history" element={<PaymentHistory />} />
          <Route path="/mypage/trash-history" element={<TrashHistory />} />
        </Route>

        <Route path="scanning-qr" element={<ScanningQR />} />
        <Route path="auth-completed" element={<Authenticated />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
