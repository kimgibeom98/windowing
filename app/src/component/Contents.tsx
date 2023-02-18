import React from "react";
import styled from "styled-components";

interface ValuesInfo{
  id : number;
  name : string;
  age : number;
  job : string;
  email : string;
}

const Contents = ({values} : any) => {
  return (
    values.map((items : ValuesInfo , index : number) => (
      <ContentBox key={index} className="ContentScroll" style={{top: items.id * 150}} >
        <TitleName>{items.id}</TitleName>
        <span>나이 : {items.age}</span>
        <span>직업 : {items.job}</span>
        <span>email : {items.email}</span>
      </ContentBox>
    ))
  )
}

export default React.memo(Contents);

const ContentBox = styled.article`
background-color : #adadad;
width : 100%;
display : flex;
position : absolute;
border-bottom : 1px solid #000;
left : 0;
align-items : center;
justify-content : center;
flex-direction: column;
height : 150px;
box-sizing : border-box;
> span{
  display : block;
  color : white;
}
`

const TitleName = styled.div`
  font-size : 25px;
  text-align : center;
  font-weight : 700;
  color : white;
  margin-bottom : 20px;
`
