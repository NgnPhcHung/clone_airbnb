import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {  DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { addDays } from 'date-fns';
import useWindowSize from '../../Hook/useWindowSize';
import weekday from 'dayjs/plugin/weekday'

export default function CheckInOut() {
  const [width, ] = useWindowSize()
  const [checkin, setCheckin] = React.useState(() => dayjs(Date.now()));
  const [checkout, setCheckout] = React.useState(() => dayjs(checkin));
  const [ranges, setRange] = React.useState([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);

  const onChange = (item)=>{
    setRange([item.selection])
  }
  const today = () =>{
    setRange([
      {
        startDate: dayjs(Date.now()).$d,
        endDate: dayjs(Date.now()).$d,
        key: 'selection'
      }
    ])
  }

  const weekSelection = (days) =>{
    dayjs.extend(weekday)
    const start = dayjs().weekday(days);
    let startWeek =  start.$d
    let endWeek =  start.endOf('week').add(1, 'days').$d
    setRange([
      {
        startDate: startWeek,
        endDate: endWeek,
        key: 'selection'
      }
    ])
  }


  return width > 740 ? (
      <Container id='booking'>
        <DateRange
          editableDateInputs={true}
          onChange={onChange}
          ranges={ranges}
          moveRangeOnFirstSelection={false}
          locale={locales['vi']}
        />
        <Buttons>
          <button onClick={today} >today</button>
          <button onClick={() => weekSelection(-6)}>last week</button>
          <button onClick={() => weekSelection(1)} >this week</button>
          <button onClick={() => weekSelection(8)} >next week</button>
        </Buttons>
      </Container>
  ) : <Container id='booking'>
      <DateRange
        editableDateInputs={true}
        onChange={onChange}
        ranges={ranges}
        moveRangeOnFirstSelection={false}
        locale={locales['vi']}
      />
      <Buttons>
        <button onClick={today} >today</button>
        <button onClick={() => weekSelection(-6)}>last week</button>
        <button onClick={() => weekSelection(1)} >this week</button>
        <button onClick={() => weekSelection(8)} >next week</button>
      </Buttons>
  </Container>;
}

const Container = styled.div`
  display: flex;
  width: 75vw;
  margin-top: 1.4rem;
  @media (max-width: 740px) {
    justify-content: center;
    align-items: center;
    width: 95%;
    flex-direction: column;
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  button{
    background-color: transparent;
    border: none;
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    height: 1.3rem;
    width: 100%;
    text-align: right;
  }

  @media (max-width: 740px){
    flex-direction: row;

    button{
      width: fit-content;
    }
  }
`