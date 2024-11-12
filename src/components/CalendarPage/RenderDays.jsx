import React  from 'react';
import '../../Pages/CalendarPage/calendar.css';

function RenderDays(props) {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create 7 weekday divs
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className={`days ${props.showEventView ? 'showEventViewdays' : ''}`}>{days}</div>;
}

export default RenderDays;
