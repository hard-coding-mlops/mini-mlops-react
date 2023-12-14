import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SideBar from './components/SideBar/SideBar';
import DataManagement from './pages/DataManagement/DataManagement';
import DataDetail from './pages/DataDetail/DataDetail';
import ModelManagement from './pages/ModelManagement/ModelManagement';
import ModelDetail from './pages/ModelDetail/ModelDetail';
import Login from './pages/Login/Login';
import UserLogManagement from './pages/UserLogManagement/UserLogManagement';
import UserLogDetail from './pages/UserLogDetail/UserLogDetail';
import DashBoard from './pages/DashBoard/DashBoard';
import NewModel from './pages/NewModel/NewModel';
import NewsClassifier from './pages/NewsClassifier/NewsClassifier';
import KakaoOauth from './pages/Login/KakaoOAuth';
// import Pipeline from './pages/Pipeline/Pipeline';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/oauth/kakao' element={<KakaoOauth />} />
                <Route element={<SideBar />}>
                    <Route path='dashboard' element={<DashBoard />} />
                    <Route path='data' element={<DataManagement />} />
                    <Route path='data/:dataId' element={<DataDetail />} />
                    <Route path='model' element={<ModelManagement />} />
                    <Route path='model/add' element={<NewModel />} />
                    <Route path='model/:modelId' element={<ModelDetail />} />
                    <Route path='user-log' element={<UserLogManagement />} />
                    <Route path='user-log/:logId' element={<UserLogDetail />} />
                </Route>
                <Route path='classify' element={<NewsClassifier />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
