import { createContext, useState } from "react"
import { json } from "react-router-dom"

export const GlobalContext = createContext(null) //useContext로 사용가능

//리덕스 대신에 전역적으로 사용할 컴포넌트 (App컴포넌트를 감싸줌 => 리덕스와 유사)
export default function GlobalState({children}){
  //검색값 스테이트
  let [searchParm, setSearchParm] = useState("")
  //음식 리스트 스테이트
  let [foodList, setFoodList] = useState([])
  //음식 상세 데이터
  let [foodDetail, setFoodDetail] = useState(null)
  //즐겨찾기 등록 리스트
  let [favorites, setFavorites] = useState([])

  //검색을 하면 검색명으로 get요청해주는 함수
  async function hSubmit(event){
    event.preventDefault();  //부모까지 이벤트가 버블링 되는 걸 막음
    try {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParm}`) 
      //get요청 (rest api의 get요청 => 쉽게 사이트 통신시킴)
      //함수에 async가 있으면 await을 쓸 수 있음
      const information = await res.json(); //제이슨 문자열로 변경
      console.log(information)
      if(information?.data.recipes){
        setFoodList(information?.data.recipes)
        setSearchParm('')
      }
    }catch(e){
      console.log(e)
    }

  }

  return(
    <>
      <GlobalContext.Provider value={{searchParm, setSearchParm, hSubmit, foodList, setFoodList, foodDetail, setFoodDetail, favorites}}>{children}</GlobalContext.Provider>
    </>
  )
}