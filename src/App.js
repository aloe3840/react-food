import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
import Deatiles from './pages/details/details';
import Navbar from './components/navbar/navbar';
import DetailItem from './components/detail-item/detail-item';

//쿼리파라미터 (동적으로 url을 설정하는 페이지) : <= 콜론으로 설정


function App() {
  return (
    <div className="base-container">
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/detailes/:id' element={<Deatiles/>}/> {/* 쿼리파라미터 */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
