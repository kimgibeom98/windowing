import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";
import ContentBox from './component/Contents';
let targetSection; 

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [startIndex, setstartIndex] = useState();
  const [endIndex, setendIndex] = useState(6);

  const getData = async () => {
    targetSection = document.querySelector('section');
    try {
      const { data } = await axios.get('http://localhost:3003/accoounts');
      setData(data);
      setstartIndex(Math.floor(targetSection.scrollTop / 150));
      setValue(data.slice(startIndex, endIndex))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {

    targetSection.addEventListener('scroll', (e) => {
      setstartIndex(Math.floor(targetSection.scrollTop / 150));
      setendIndex(startIndex + 6);
      setValue(data.slice(startIndex, endIndex))
    })

  }, [data, endIndex, startIndex])

  return (
    <SectionBox className="App">
      <ContentBox value={value} />
    </SectionBox>
  );
}

export default App;

const SectionBox = styled.section`
  width: 600px;
  height : 600px;
  overflow-y : scroll;
  margin : 50px auto 0;
  position : relative;
`