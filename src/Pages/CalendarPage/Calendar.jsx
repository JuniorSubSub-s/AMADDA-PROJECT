import React, { useState, useEffect, useCallback } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import RenderHeader from "../../components/CalendarPage/RenderHeader";
import RenderDays from '../../components/CalendarPage/RenderDays';
import RenderCells from '../../components/CalendarPage/RenderCells';
import EventView from "../../components/CalendarPage/EventView";
import TodoList from "../../components/CalendarPage/TodoList";
import TodoWritePage from "../../components/CalendarPage/TodoWritePage";

function Calendar({ userId }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateId, setDateId] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [eventData, setEventData] = useState([]);
    const [eventDatas, setEventDatas] = useState([]);
    const [userAlarmDatas, setUserAlarmDatas] = useState([]);
    const [showEventView, setShowEventView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [listId, setListId] = useState('');

    // 공휴일 데이터 가져오기
    const getHistoryData = useCallback(async (year, month) => {
        try {
            await api.get(`api/history`, {
                params: { solYear: year, solMonth: month },
            });
        } catch (err) {
            console.error('공휴일 데이터 로드 실패 : ', err);
        }
    }, []);

    // 알람 데이터 가져오기
    const getUserAlarmDatas = useCallback(async () => {
        try {
            const response = await api.get(`events/alarmData/${userId}`);
            setUserAlarmDatas(response.data);
        } catch (err) {
            console.error('알람 데이터 로드 실패 : ', err);
        }
    }, [userId]);

    // 월별 이벤트 데이터 가져오기
    const getEventData = useCallback(async () => {
        const currentYearMonth = format(currentMonth, 'yyyy-MM');
        try {
            const response = await api.get(`events/index/${currentYearMonth}`, {
                params: { userId: userId }
            });
            setEventDatas(response.data);
        } catch (err) {
            console.error('월별 이벤트 데이터 로드 실패 : ', err);
        }
    }, [currentMonth, userId]);

    // 특정 날짜의 이벤트 데이터 가져오기
    const getData = useCallback(async () => {
        try {
            const response = await api.get(`events/viewday/${dateId}`, {
                params: { userId },
            });
            setEventData(response.data);
        } catch (err) {
            console.error('특정 날짜의 이벤트 데이터 로드 실패 : ', err);
        }
    }, [dateId, userId]);

    useEffect(() => {
        const init = async () => {
            const year = format(currentMonth, 'yyyy');
            const month = format(currentMonth, 'MM');
            await getHistoryData(year, month);
            await getEventData();
        };
        init();
    }, [currentMonth, getEventData, getHistoryData]);

    useEffect(() => {
        if (userId) getData();
    }, [dateId, userId, getData]);

    useEffect(() => {
        getUserAlarmDatas();
    }, [getUserAlarmDatas]);

    const handleDateClick = (day, id) => {
        setDateId(id);
        setSelectedDate(day);
        setShowEventView(true);
    };

    const handleDelete = async (id, title) => {
        if (window.confirm(`${title}을(를) 삭제하시겠습니까?`)) {
            try {
                await api.delete(`/events/delete/${id}`);
                getData();
                getEventData();
            } catch (err) {
                console.error('이벤트 삭제 실패 : ', err);
            }
        }
    };

    const handleUpdateModal = (listId) => {
        setListId(listId);
        setShowUpdateModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setShowUpdateModal(false);
    };

    const updateLastEvents = (index) => {
        setUserAlarmDatas((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    nextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={handleDateClick}
                    eventDatas={eventDatas}
                    updateLastEvents={updateLastEvents}
                />
            </div>

            {showEventView && (
                <div style={{ width: '100%', height: '100%' }}>
                    <div className={`eventview ${showEventView ? 'active' : ''}`}>
                        <EventView
                            currentMonth={currentMonth}
                            currentYear={format(selectedDate, 'yyyy')}
                            currentMonthFormatted={format(selectedDate, 'M')}
                            currentDay={format(selectedDate, 'd')}
                            currentWeekday={format(selectedDate, 'EEEE', { locale: ko })}
                            toggleEventView={() => setShowEventView(!showEventView)}
                            userAlarmDatas={userAlarmDatas}
                        />
                        <TodoList
                            data={eventData}
                            onDelete={handleDelete}
                            addModal={() => setShowModal(true)}
                            UpdateModal={handleUpdateModal}
                        />
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal">
                        <TodoWritePage
                            setShowModal={setShowModal}
                            dateId={dateId}
                            currentMonth={currentMonth}
                            getEventData={getEventData}
                            getData={getData}
                            userId={userId}
                        />
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal">
                        <EventUpdate
                            setShowUpdateModal={setShowUpdateModal}
                            dateId={dateId}
                            currentMonth={currentMonth}
                            getEventData={getEventData}
                            listId={listId}
                            getData={getData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;