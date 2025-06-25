import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnBoarding from "./pages/beforeLogin/onBoarding";
import Main from "./pages/afterLogin/main/main";
import Mypage from "./pages/afterLogin/mypage/mypage";
import MainLayout from "./pages/afterLogin/mainLayout";
import AroundTrash from "./pages/afterLogin/aroundTrash/aronudTrash";
import ChatPage from "./pages/afterLogin/chat-bot/chatPage";
import Favorites from "./pages/afterLogin/mypage/favorites/favorites";
import ScrollTop from "./utils/scrollTop";
import SetUserInfo from "./pages/beforeLogin/login/setUserInfo";
import Login from "./pages/beforeLogin/login/login";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SetUserInfo />} />

        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/around-trash" element={<AroundTrash />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/chat-bot" element={<ChatPage />} />

          {/* 마이페이지 하위 페이지 */}
          <Route path="/mypage/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
