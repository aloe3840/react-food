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

  //즐겨찾기 등록 리스트 추가/삭제
  //state의 배열은 직접 수정X ==> ...으로 분리하고 대괄호로 감싸서 카피본으로 수정 [...]
  //변수를 안쓰고 useState를 사용하는 이유가 데이터 값이 바뀌면 화면도 같이 갱신해주려고
  function hAddToFavorite(getCurItem){
    let copyfavorites = [...favorites] //배열 통채로 분해했다가 다시 배열로 만들어서 대입
    //let copyfavorites = favorites   주소값(공간의 위치)만 들어감

    //동일한 id가 있는지 검사 getCurItem의 id와 favories의 id들을 비교
    const index = copyfavorites.findIndex(e=>e.id === getCurItem.id) //하나씩 비교해서 못찾으면 -1 찾으면 해당 위치를 return해줌
    
    if(index === -1){
      copyfavorites.push(getCurItem)  //즐겨찾기 리스트에 없으면 추가
    }else{
      copyfavorites.splice(index) //즐겨찾기 리스트에 있었으면 제거
    }

    //새로 만든 배열을 state에 엎어친다
    setFavorites(copyfavorites)
  }



  return(
    <>
      <GlobalContext.Provider value={{searchParm, setSearchParm, hSubmit, foodList, setFoodList, foodDetail, setFoodDetail, favorites, hAddToFavorite}}>{children}</GlobalContext.Provider>
    </>
  )
}