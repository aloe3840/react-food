import { useContext } from 'react'
import './home.css'
import { GlobalContext } from '../../context/context'
import DetailItem from '../../components/detail-item/detail-item'

export default function Home(){
  const {foodList} = useContext(GlobalContext)
  console.log("dwdw", foodList)
  return(
    <div className='home-container'>
      {
        foodList ? (
          //데이터가 있을 때
          foodList.map((food, idx)=>{
            return(
              <DetailItem key={idx} item={food}/>
            )
          })
        ) : (
          //데이터가 없을 때
          <div className='no-item'>
            <p>검색하세요. pizza, banana, apple ...</p>
            <a href='https://forkify-api.herokuapp.com/phrases.html' target='_blank'> 
              <button className='guide-button'>검색 항목 안내</button>
            </a>
          </div>
        )
      }
    </div>
  )
}