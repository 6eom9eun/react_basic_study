/* eslint-disable */ // Lint (warning)끄는 기능

import './App.css';
import { useState } from 'react'; // 자료 잠깐 저장할 땐 state 사용해도됨, state는 변경되면 html 자동 재렌더링

function App() {

  let [title, setTitle] = useState(['안녕하세요', '안녕히 가세요', '감사합니다']); // setTitle는 state 변경 도와주는 함수
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [titleNum, setTitleNum] = useState(0);
  let [inputValue, setInputValue] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>개발 블로그</h4>
        </div>

      <button onClick={() => {
          let copy = [...title]; // 독립적 카피본 만들어서 수정해야함, ...은 괄호를 벗김
          copy.sort();
          setTitle(copy);
          }}>🤣</button>

      {
        title.map(function(a, i){ // 파라미터 2개 되면, i는 0부터 1 씩 증가하는 정수임.
          return(
            <div className='list'>
              <h4 onClick={()=>{setModal(!modal); setTitleNum(i)}}>{ title[i] } <span onClick={(e)=>{
                e.stopPropagation();
                let copy = [...like];
                copy[i] = copy[i] + 1
                setLike(copy)
                }}>👍</span>{like[i]}</h4>
                <button onClick={()=>{
                  let copy = [...title]
                  copy.splice(i,1)
                  setTitle(copy)
                }}>삭제</button>
            </div>
          )
        })
      }

      <input onChange={(e)=>{ setInputValue(e.target.value); console.log(inputValue)}}/>
      <button onClick={()=>{
        let copy = [...title];
        copy.unshift(inputValue);
        setTitle(copy)
      }}>글발행</button>
      <p>{inputValue}</p>

      {
        modal == true ? <Modal setTitleNum = {setTitleNum} setTitle={setTitle} title={title}/> : null
      }

    </div>
  );

  function Modal(props){ // 컴포넌트화, 반복적인 html, 큰 페이지, 자주 변경되는 페이지
    return (
      <>
      <div className="modal" style={{background : 'skyblue'}}>
        <h4>{props.title[titleNum]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={()=>{
          props.setTitle(['안녕 못해', '안녕히 가지마', '감사하지않아'])
        }}>글수정</button>
      </div>
      </>
    )
  }

  class Modal2 extends React.Component { // 예전 리액트 버전에서는 컴포넌트 class 문법을 사용했음
    constructor(props){
      super(props)
      this.state = {
        name : 'kwak',
        age : 20
      }
    }
    render(){
      return(
        <div>안녕{this.state.name}
        <button onClick={()=>{
          this.setState({age : 21})
        }}>버튼</button>
        </div>
      )
    }
  }




}
export default App;
