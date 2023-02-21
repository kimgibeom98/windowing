import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import ContentBox from './component/Contents';
import { UserProps } from './models/user';

function App() {
  const [data, setData] = useState<Array<UserProps>>([]);
  const [values, setValues] = useState<Array<UserProps>>([]);
  const [startIndex, setstartIndex] = useState(0);
  const [endIndex, setendIndex] = useState(6);

  const targetSection = useRef<HTMLDivElement>(null);

  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3003/accoounts');
      setData(data);
      if (targetSection.current !== null) setstartIndex(Math.floor(targetSection.current.scrollTop / 150));
      setValues(data.slice(startIndex, endIndex))
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (targetSection.current !== null) {
      targetSection.current.addEventListener('scroll', (e) => {
        if (targetSection.current !== null) {
          const targetPosition = Math.floor(targetSection.current.scrollTop / 150);
          targetPosition === 0 ? setstartIndex(0) : setstartIndex(targetPosition - 1);
          setendIndex(targetPosition + 6);
          setValues(data.slice(startIndex, endIndex))
        }
      })
    }
  }, [data, endIndex, startIndex]);

  return (
    <SectionBox className="App" ref={targetSection}>
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
