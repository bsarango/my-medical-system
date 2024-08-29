import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue({setDate}) {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    function assignDateValue(dateValue){
        const date = new Date(dateValue)
        const finalDate = date.getFullYear() + '-' +  (date.getMonth() + 1)  + '-' +  date.getDate()
        setDate(finalDate)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Appointment Date"
            value={value}
            onChange={(newValue) => {setValue(newValue),assignDateValue(newValue)}}
            />
        </LocalizationProvider>
    );
}