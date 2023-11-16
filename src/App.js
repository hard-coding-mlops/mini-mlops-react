import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import History from './pages/History/History';
import Service from './pages/Service/Service';
import Pipeline from './pages/Pipeline/Pipeline';
import NewsClassifier from './pages/NewsClassifier/NewsClassifier';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<SideBar />}>
          <Route index element={<Pipeline />} />
          <Route path='history' element={<History />} />
          <Route path='history/:recordId' element={<History />} />
          <Route path='service' element={<Service />} />
        </Route>
        <Route path='news-classifier' element={<NewsClassifier />} />
      </Routes>
    </div>
  );
}

export default App;
