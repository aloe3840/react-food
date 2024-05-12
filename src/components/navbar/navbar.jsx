import { Link, NavLink } from 'react-router-dom'
import './navbar.css'
import { useContext } from 'react'
import { GlobalContext } from '../../context/context';

export default function Navbar(){
  const {searchParm, setSearchParm, hSubmit} = useContext(GlobalContext);

  console.log(searchParm)


  return(
    <>
      <nav className='nav-flex-container'>
        <h2 className='nav-logo'>
          <Link to={'/'}>음식 레시피 앱</Link>
        </h2>
        <form onSubmit={hSubmit}>
          <input type='text' name='search' placeholder='제품명을 입력하세요' className='nav-search-input' value={searchParm} onChange={(e)=>{setSearchParm(e.target.value)}}/>
        </form>
        <ul className='nav-link-ul'>
          <li>
            <NavLink to={'/'} className='nav-link-li'>홈페이지</NavLink>
          </li>
          <li>
            <NavLink to={'/favorites'} className='nav-link-li'>즐겨찾기</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}