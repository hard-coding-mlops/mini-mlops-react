import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import History from './pages/History';

function App() {
  return (
    <div className='App'>
      <SideBar />
      {/* <hr /> */}
      <Routes>
        <Route path='/' element={<div>Pipeline</div>} />
        <Route path='/history' element={<History />} />
        <Route path='/service' element={<div>Service</div>} />
      </Routes>
    </div>
  );
}

export default App;
