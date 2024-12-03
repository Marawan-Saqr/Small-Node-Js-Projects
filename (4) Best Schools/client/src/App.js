import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import System from './Components/System';
import AllSchools from './Components/All-schools/Schools.jsx';
import NotFound from './Components/Notfound/NotFound.jsx';
import WelcomePage from './Components/Welcome-page/WelcomePage.jsx';
import AddSchool from './Components/Add-school/AddSchool.jsx';
import UpdateSchool from './Components/Update-school/UpdateSchool.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<System />}>
            <Route index element={<WelcomePage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="schools" element={<AllSchools />} />
            <Route path="add-school" element={<AddSchool />} />
            <Route path="update-school/:UPDATENOTE" element={<UpdateSchool />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;