import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react"; 
import Loading from "./components/loading";
import ScrollTop from "./utils/scrollTop";

const OnBoarding = lazy(() => import("./pages/beforeLogin/onBoarding"));
const Login = lazy(() => import("./pages/beforeLogin/login/login"));
const SetUserInfo = lazy(() => import("./pages/beforeLogin/login/setUserInfo"));

const MainLayout = lazy(() => import("./pages/afterLogin/mainLayout"));
const Main = lazy(() => import("./pages/afterLogin/main/main"));
const Mypage = lazy(() => import("./pages/afterLogin/mypage/mypage"));
const AroundTrash = lazy(
  () => import("./pages/afterLogin/aroundTrash/aronudTrash")
);
const ChatPage = lazy(() => import("./pages/afterLogin/chat-bot/chatPage"));
const Favorites = lazy(
  () => import("./pages/afterLogin/mypage/favorites/favorites")
);

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SetUserInfo />} />

          <Route element={<MainLayout />}>
            <Route path="/main" element={<Main />} />
            <Route path="/around-trash" element={<AroundTrash />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/chat-bot" element={<ChatPage />} />
            <Route path="/mypage/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
