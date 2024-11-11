import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import '../../Pages/CalendarPage/calendar.css'; // SCSS 대신 CSS 파일을 import
import './Modal.css';
import DragDropEventpage from "./DragDropEventpage";

function RenderCells(props) {
    const { currentMonth, selectedDate, onDateClick, eventDatas, showEventView } = props;

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [nowDay, setNowDay] = useState("");
    const [hoveredEvents, setHoveredEvents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [showDropmodal, setShowDropModal] = useState(false);
    const [dropEventData, setDropEventData] = useState([]);

    useEffect(() => {
        setNowDay(format(new Date(), 'yyyy-MM-dd'));
    }, []);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

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
            const modalTop = top;
            const adjustedLeft = modalLeft + 210 > window.innerWidth ? left - 210 - 10 : modalLeft;
            const adjustedTop = modalTop + 180 > window.innerHeight ? top - 100 : modalTop;
            setModalPosition({
                top: adjustedTop,
                left: adjustedLeft
            });
        };
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const eventData = JSON.parse(e.dataTransfer.getData("application/json"));
        setDropEventData(eventData);
        setShowDropModal(true);
    };

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            const dayId = format(day, 'yyyy-MM-dd');
            const eventsForDay = findEventsForDate(day);

            days.push(
                <div
                    className={`col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled'        // 같은 월이 아닌 애들
                        : isSameDay(day, selectedDate)
                            ? 'selected'    // 선택된 날짜
                            : isSameDay(day, nowDay)
                                ? 'nowday'  // 오늘 날짜
                                : 'valid'   // 현재 월에 해당하는 애들
                        }`}
                    key={dayId}
                    onClick={() => {
                        setIsModalVisible(false);
                        onDateClick(cloneDay, dayId);
                    }}
                    onMouseEnter={(e) => handleMouseEnter(dayId, e)}
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={handleDragOver}
                >
                    <span className={!isSameMonth(day, monthStart) ? 'not-valid' : ''}>
                        {formattedDate}
                    </span>
                    {eventsForDay.length > 0 && (
                        <div className="eventsContainer">
                            {eventsForDay.map((event, index) =>
                                index < 2 ? (
                                    <div className="eventcontent" key={event.calId}>
                                        <div>
                                            <label className="eventpoint" style={{ backgroundColor: event.color, marginBottom: '0' }}></label>
                                        </div>
                                        <div>
                                            <button
                                                className={`eventcellBtn ${isSameDay(cloneDay, selectedDate) ? 'selectedBtn' : 'notselectedBtn'} ${showEventView ? 'showEventViewBtn' : ""}`}
                                            >
                                                {event.title}
                                            </button>
                                        </div>
                                    </div>
                                ) : null
                            )}
                            {eventsForDay.length > 2 && (
                                <div className="eventcontent">
                                    <button
                                        className={`morebtn ${showEventView ? 'showEventViewBtn' : ""} ${isSameDay(day, selectedDate) ? 'selectedBtn btn-dark' : 'notselectedBtn'}`}
                                        disabled
                                    >
                                        + {eventsForDay.length - 2}개
                                    </button>
                                </div>
                            )}
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

    const renderModal = () => {
        if (!isModalVisible || hoveredEvents.length === 0) return null;

        return (
            <div className="eventmodal" style={{ position: "absolute", zIndex: '1000', top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}>
                <div className="modalContent">
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <h5 style={{ margin: '0', marginTop: '10px', fontSize: '20px' }}>{format(hoveredEvents[0]?.day, 'yyyy년 M월 dd일')}</h5>
                        <button style={{ marginLeft: '10px', marginTop: '5px', height: '25px', borderStyle: 'none', backgroundColor: 'white', fontSize: '25px', alignSelf: 'flex-start', cursor: 'pointer' }}
                            onClick={() => { setIsModalVisible(false) }}
                        >x</button>
                    </div>
                    <ul style={{ paddingLeft: "0px", marginTop: '10px' }}>
                        {hoveredEvents.map(event => (
                            <li key={event.calId} style={{ color: event.color }}>
                                <span>{event.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="body">
            {rows}
            {renderModal()}
            {showDropmodal && (
                <>
                    <div className="modal-overlay" onClick={() => setShowDropModal(false)}></div>
                    <div className="modal">
                        <DragDropEventpage setShowDropModal={setShowDropModal} dropEventData={dropEventData} />
                    </div>
                </>
            )}
        </div>
    );
}

export default RenderCells;
