import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import styled from 'styled-components';

export default function CheckInOut() {
  const [checkin, setCheckin] = React.useState(() => dayjs('2022-02-01T00:00'));
  const [checkout, setCheckout] = React.useState(() => dayjs('2022-02-01T00:00'));

  return (
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(newValue) => setCheckin(newValue)}
              value={checkin}
              renderInput={(params) => <TextField disabled {...params} />}
              componentsProps={{
                actionBar: {
                  actions: ['today'],
                },
              }}
            />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(newValue) => setCheckout(newValue)}
              value={checkout}
              renderInput={(params) => <TextField disabled {...params} />}
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
`