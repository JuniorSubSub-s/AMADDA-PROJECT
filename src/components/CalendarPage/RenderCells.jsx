import React, { useEffect, useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
} from 'date-fns';
import DragDropEventpage from './DragDropEventpage';

import '../../Pages/CalendarPage/calendar.css';
import './Modal.css';

function RenderCells({
    currentMonth,
    selectedDate,
    onDateClick,
    eventDatas,
    updateLastEvents,
    getData,
    getEventData,
}) {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const [nowDay, setNowDay] = useState('');
    const [hoveredEvents, setHoveredEvents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [showDropmodal, setShowDropModal] = useState(false);
    const [dropEventData, setDropEventData] = useState([]);

    useEffect(() => {
        setNowDay(format(new Date(), 'yyyy-MM-dd'));
    }, []);

    const findEventsForDate = (date) => {
        return eventDatas.filter(event => event.day === format(date, 'yyyy-MM-dd'));
    };

    const handleMouseEnter = (date, e) => {
        const eventsForDay = findEventsForDate(date);
        setHoveredEvents(eventsForDay);
        setIsModalVisible(true);

        const cell = e.target.closest('.cell');
        if (cell) {
            const { top, left, width } = cell.getBoundingClientRect();
            const modalLeft = left + width + 10;
            const modalTop = top + window.scrollY;

            setModalPosition({
                top: Math.min(modalTop, window.innerHeight + window.scrollY - 200),
                left: Math.min(modalLeft, window.innerWidth - 220),
            });
        }
    };

    const handleDrop = (e, dayId) => {
        e.preventDefault();
        const eventData = JSON.parse(e.dataTransfer.getData('application/json'));
        setDropEventData({ ...eventData, DropDay: dayId });
        setShowDropModal(true);
    };

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const cloneDay = day;
            const dayId = format(day, 'yyyy-MM-dd');
            const eventsForDay = findEventsForDate(day);

            days.push(
                <div
                    className={`col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate)
                            ? 'selected'
                            : isSameDay(day, nowDay)
                                ? 'nowday'
                                : 'valid'
                        }`}
                    key={dayId}
                    onClick={() => {
                        setIsModalVisible(false);
                        onDateClick(cloneDay, dayId);
                    }}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onDrop={(e) => handleDrop(e, dayId)}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <span
                        className={!isSameMonth(day, monthStart) ? 'not-valid' : ''}
                    >
                        {format(day, 'd')}
                    </span>
                    {eventsForDay.length > 0 && (
                        <div className="eventsContainer">
                            {eventsForDay.slice(0, 2).map((event) => (
                                <ul className="eventcontent" key={event.calId}>
                                    <li className="eventcellBtn">{event.title}</li>
                                </ul>
                            ))}
                        </div>
                    )}
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }

    const renderModal = () =>
        isModalVisible && hoveredEvents.length > 0 && (
            <div
                className="eventmodal"
                style={{ top: modalPosition.top, left: modalPosition.left }}
            >
                <div className="modalContent">
                    <h5>{format(new Date(hoveredEvents[0]?.day), 'yyyy년 M월 dd일')}</h5>
                    <button
                        className="closeButton"
                        onClick={() => setIsModalVisible(false)}
                    >
                        ×
                    </button>
                    <ul>
                        {hoveredEvents.map(event => (
                            <li key={event.calId}>{event.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );

    return (
        <div className="body">
            {rows}
            {renderModal()}
            {showDropmodal && (
                <>
                    <div
                        className="modal-overlay"
                        onClick={() => setShowDropModal(false)}
                    ></div>
                    <div className="modal">
                        <DragDropEventpage
                            setShowDropModal={setShowDropModal}
                            dropEventData={dropEventData}
                            updateLastEvents={updateLastEvents}
                            currentMonth={currentMonth}
                            getEventData={getEventData}
                            getData={getData}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default RenderCells;
