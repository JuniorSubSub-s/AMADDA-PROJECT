import React from 'react';
import '../../Pages/CalendarPage/calendar.css';

function RenderDays() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="days">
            {days.map((day, index) => (
                <div className="col" key={index}>
                    {day}
                </div>
            ))}
        </div>
    );
}

export default RenderDays;