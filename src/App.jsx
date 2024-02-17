import { Route, Routes } from "react-router-dom";

//pages
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Homepage from "./pages/Homepage/Homepage";
import NoteGroupContent from "./pages/NoteGroupContent/NoteGroupContent";
import NoteGroupContentLayout from "./pages/NoteGroupContent/NoteGroupContentLayout";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='groups/:id' element={<NoteGroupContentLayout />}>
        <Route index element={<NoteGroupContent />}></Route>
      </Route>
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  );
}
export default App;
