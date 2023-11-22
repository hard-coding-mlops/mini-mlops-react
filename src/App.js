import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import DataManagement from './pages/DataManagement/DataManagement';
// import Pipeline from './pages/Pipeline/Pipeline';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<SideBar />}>
          <Route index element={<>HOME</>} />
          <Route path='data' element={<DataManagement />} />
          <Route path='models' element={<>m</>} />
          <Route path='user-logs' element={<>ul</>} />
        </Route>
        {/* <Route path='news-classifier' element={<NewsClassifier />} /> */}
      </Routes>
    </div>
  );
}

export default App;
