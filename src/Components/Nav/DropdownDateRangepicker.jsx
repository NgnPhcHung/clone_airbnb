import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {  DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { addDays } from 'date-fns';

export default function DropdownDateRangepicker(props) {
  const [ranges, setRange] = useState([
    {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);

    const onChange = (item)=>{
        setRange([item.selection])
    }

  return (
    <Container>
      <DateRange
        editableDateInputs={true}
        onChange={onChange}
        ranges={ranges}
        moveRangeOnFirstSelection={false}
        locale={locales['enGB']}
    />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  padding: 0 1rem;

  @media (max-width: 740px){
    width: 90%;
    justify-content: center;
    align-items: center;
  }
`
