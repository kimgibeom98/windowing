import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import ContentBox from './component/Contents';

interface ValuesInfo {
  id : number;
  name : string;
  age : number;
  job : string;
  email : string;
}

function App() {
  const [data, setData] = useState<Array<ValuesInfo>>([]);
  const [values, setValues] = useState<Array<ValuesInfo>>([]);
  const [startIndex, setstartIndex] = useState<number>(0);
  const [endIndex, setendIndex] = useState<number>(6);

  const getData = async () => {
    let targetSection = document.querySelector('section') as HTMLElement;
    try {
      const { data } = await axios.get('http://localhost:3003/accoounts');
      setData(data);
      setstartIndex(Math.floor(targetSection.scrollTop / 150));
      setValues(data.slice(startIndex, endIndex))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    let targetSection = document.querySelector('section') as HTMLElement;
    targetSection.addEventListener('scroll', (e) => {
      setstartIndex(Math.floor(targetSection.scrollTop / 150));
      setendIndex(startIndex + 6);
      setValues(data.slice(startIndex, endIndex))
    })

  }, [data, endIndex, startIndex])

  console.log(values)

  return (
    <SectionBox className="App">
      <ContentBox values={values} />
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