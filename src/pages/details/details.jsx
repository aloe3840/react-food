import { useParams } from 'react-router-dom'
import './details.css'
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/context';

export default function Detailes(){
  const {id} = useParams();
  const {foodDetail, setFoodDetail, favoritesList, hAddToFavorite, favorites} = useContext(GlobalContext)

  useEffect(()=>{
    async function getFoodDetail(){
      //음식 상세 정보를 받아올 거임
      //async비동기를 썼으니까 await으로 완료될 때까지 대기 시키기 가능
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`) //get요청으로 레시피 받아오기

      const data = await res.json();
      console.log(data)

      if(data?.data){
        setFoodDetail(data?.data);
      }
    }

    getFoodDetail();

  },[]) //바뀔 때마다 update가 되지 않도록 빈배열 넣기

  return(
    <div className='detailes-container'>

      {/* 이미지 */}
      <div className='img-container'>
        <div className='img-wrapper'>
          <img src={foodDetail?.recipe?.image_url} className='img-style' alt='사진'/>
        </div>
      </div>

      {/* 글 */}
      <div className='content-container'>
        <span className='text-publisher'>{foodDetail?.recipe?.publisher}</span>
        <h3>{foodDetail?.recipe?.title}</h3>

        {/* 즐겨찾기 추가 버튼 */}
          <div>
            <button onClick={()=>{hAddToFavorite(foodDetail?.recipe)}} className='favorites-btn'>
              {/* 해당 id가 즐겨찾기 있으면 추가 아니면 제거 */
                favorites && favorites.lenght > 0 && favorites.findIndex(item=>item.id === foodDetail.recipe?.id) !== -1?
                '즐겨찾기에서 제거' : '즐겨찾기에 추가'
              }
              </button>

          </div>
        {/* 레시피 내용 */}
          <div>
            <span className='recipe-title'>레시피: </span>
            <ul className='recipe-content'>
              {
                //map을 통해 들어있는 만큼만 li태그 생성
                foodDetail?.recipe?.ingredients.map((ingredient, idx)=>{
                  return(
                    //jsx
                    <li key={idx}>
                      <span>{ingredient.quantity} {ingredient.unit}</span>
                      <span>{ingredient.description}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
      </div>
    </div>
  )
}