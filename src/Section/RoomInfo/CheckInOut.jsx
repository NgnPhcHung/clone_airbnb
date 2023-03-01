import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import styled from 'styled-components';

export default function CheckInOut() {
  const [checkin, setCheckin] = React.useState(() => dayjs(Date.now()));
  const [checkout, setCheckout] = React.useState(() => dayjs(checkin));
  
  return (
      <Container id='booking'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(newValue) => setCheckin(newValue)}
              value={checkin}
              renderInput={(params) => <TextField disabled {...params} />}
              showToolbar={false}
              disablePast={true}
              disableOpenPicker
              componentsProps={{
                actionBar: {
                  actions: ['today', 'clear'],
                },
              }}
            />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(newValue) => setCheckout(newValue)}
              value={checkout}
              showToolbar={false}
              renderInput={(params) => <TextField disabled={true} {...params} />}
              disablePast={true}
              componentsProps={{
                actionBar: {
                  actions: ['clear'],
                },
              }}
            />
        </LocalizationProvider>
      </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 70%;
  @media (max-width: 740px) {
    width: 100%;
  }
`