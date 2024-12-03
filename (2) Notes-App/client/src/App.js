import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import System from './Components/System';
import Todo from './Components/Get-todos/Todo.jsx';
import NotFound from './Components/Notfound/NotFound.jsx';
import WelcomePage from './Components/Welcome-page/WelcomePage.jsx';
import AddNote from './Components/Add-note/AddNote.jsx';
import UpdateNote from './Components/Update-todo/UpdateNote.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<System />}>
            <Route index element={<WelcomePage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="todo" element={<Todo />} />
            <Route path="add-note" element={<AddNote />} />
            <Route path="update-note/:UPDATENOTE" element={<UpdateNote />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;