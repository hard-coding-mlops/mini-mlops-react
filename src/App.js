import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import DataManagement from './pages/DataManagement/DataManagement';
import DataDetail from './pages/DataDetail/DataDetail';
import ModelManagement from './pages/ModelManagement/ModelManagement';
import ModelDetail from './pages/ModelDetail/ModelDetail';
import Login from './pages/Login/Login';
// import Pipeline from './pages/Pipeline/Pipeline';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<SideBar />}>
          <Route path='dashboard' element={<>DASHBOARD</>} />
          <Route path='data' element={<DataManagement />} />
          <Route path='data/:dataId' element={<DataDetail />} />
          <Route path='model' element={<ModelManagement />} />
          <Route path='model/:modelId' element={<ModelDetail />} />
          <Route path='user-logs' element={<>ul</>} />
        </Route>
        {/* <Route path='news-classifier' element={<NewsClassifier />} /> */}
      </Routes>
    </div>
  );
}

export default App;
