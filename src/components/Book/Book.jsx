import { Link, useParams } from 'react-router';
import { useContext, useState } from "react";
import {UserContext} from '../../App';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Button} from '@mui/material';


const Book = () => {
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date().setDate(new Date().getDate() + 3),
    });
    const {bedType} = useParams();
    const [loggedInUser] = useContext(UserContext);

    const handleBooking = () => {

    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hello {loggedInUser.name}, Let's Book a {bedType} Room</h1>
            <p>Want a <Link to='/'>different room</Link></p>
            <div className='date-group' style={{ display: 'flex', justifyContent: 'space-around' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label='Check In Date'
                        format='MM/dd/yyyy'
                        value={selectedDate.checkIn}
                        onChange={(newDate) => {
                            setSelectedDate({ ...selectedDate, checkIn: newDate })
                        }}
                    />
                    <DatePicker
                        label="CheckOut Date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={newDate => {
                            setSelectedDate({...selectedDate, checkOut: newDate})
                        }}
                    />
                </LocalizationProvider>
            </div>
            <Button variant='contained' onClick={handleBooking}>Book Now</Button>
        </div>
    );
};

export default Book;
