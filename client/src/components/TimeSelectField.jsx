import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

 function TimeSelectField({setTime}){
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));

  function setNewTime(newValue){
    setValue(newValue)
    const date = new Date(newValue)
    const simpleDate = date.toTimeString('HH:mm')
    setTime(simpleDate.split(':')[0]+'-'+simpleDate.split(':')[1])
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
        label="Appointment Time"
        value={value}
        onChange={(newValue) => setNewTime(newValue)}
        />
    </LocalizationProvider>
  );
}

export default TimeSelectField