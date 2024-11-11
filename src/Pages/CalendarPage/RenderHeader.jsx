import React from 'react';
import { format } from 'date-fns';
import './calendar.css'; // Updated import to use regular CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretRight, faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';

function RenderHeader(props) {
    const { currentMonth, prevMonth, nextMonth } = props;

    return (
        <div className="header"> {/* Removed styles prefix */}
            <button className="button" onClick={prevMonth}>
                <FontAwesomeIcon icon={faSquareCaretLeft} />
            </button>
            <span className="text">
                <span className="text-year">
                    {format(currentMonth, 'yyyy')}년
                </span>
                &nbsp;&nbsp;
                <span className="text-month">
                    {format(currentMonth, 'M')}월
                </span>
            </span>
            <button className="button" onClick={nextMonth}>
                <FontAwesomeIcon icon={faSquareCaretRight} />
            </button>
        </div>
    );
}

export default RenderHeader;
