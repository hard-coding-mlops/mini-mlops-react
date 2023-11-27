import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import DataManagement from './pages/DataManagement/DataManagement';
import DataDetail from './pages/DataDetail/DataDetail';
import ModelManagement from './pages/ModelManagement/ModelManagement';
// import Pipeline from './pages/Pipeline/Pipeline';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<SideBar />}>
          <Route path='dashboard' element={<>DASHBOARD</>} />
          <Route path='data' element={<DataManagement />} />
          <Route path='data/:dataId' element={<DataDetail />} />
          <Route path='models' element={<ModelManagement />} />
          <Route path='user-logs' element={<>ul</>} />
        </Route>
        {/* <Route path='news-classifier' element={<NewsClassifier />} /> */}
      </Routes>
    </div>
  );
}

export default App;
