import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import History from './pages/History/History';
import Service from './pages/Service/Service';
import Pipeline from './pages/Pipeline/Pipeline';

function App() {
  return (
    <div className='App'>
      <SideBar />
      <Routes>
        <Route path='/' element={<Pipeline />} />
        <Route path='/history' element={<History />} />
        <Route path='/history/:recordId' element={<History />} />
        <Route path='/service' element={<Service />} />
      </Routes>
    </div>
  );
}

export default App;
