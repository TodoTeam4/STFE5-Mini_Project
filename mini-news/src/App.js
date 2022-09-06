import NewsListPage from "./components/NewsList/NewsListPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import { WrapInner } from "./styles/WrapStyle";
import ClipList from "./components/Clip/ClipList";

function App() {
  
  return (
    <>
      <WrapInner>
        <Header />
          <Routes>
            <Route path="/" element={<NewsListPage />}/>
            <Route path="/clip" element={<ClipList props={true}/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>  {/* 이상한경로로가도 홈으로 */}
          </Routes>
      </WrapInner>
    </>
  );
}

export default App;
