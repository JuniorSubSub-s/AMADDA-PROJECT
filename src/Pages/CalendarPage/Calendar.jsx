import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';

import RenderHeader from '../../components/CalendarPage/RenderHeader';
import RenderDays from '../../components/CalendarPage/RenderDays';
import RenderCells from '../../components/CalendarPage/RenderCells';
import EventView from "../../components/CalendarPage/EventView";
import TodoList from "../../components/CalendarPage/TodoList";
import { ko } from 'date-fns/locale';
import api from "../../api/axios";
import TodoWritePage from "../../components/CalendarPage/TodoWritePage";
import EventUpdate from "../../components/CalendarPage/EventUpdate";

function Calendar(props) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateId, setDateId] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [eventData, setEventData] = useState([]);
    const [eventDatas, setEventDatas] = useState([]);
    const [showEventView, setShowEventView] = useState(false);
    const [showmodal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [listId, setListId] = useState("");
    const [userId, setUserId] = useState(props.userId); // 유저 아이디 상태 추가
    const [userAlarmDatas, setuserAlarmDatas] = useState([]); // 유저에게 오래된 이벤트 4개를 가져와 알람으로 전송
    const [offset, setOffset] = useState(0); // offset 상태 추가

    useEffect(() => {
        getUserAlarmDatas();
    }, [])

    const getUserAlarmDatas = async () => {
        console.log("offset : " + offset);

        console.log("유저의 알람 데이터 불러오기");
        try {
            const response = await api.get(`events/alarmData/${userId}`, {
                params: { offset: offset }
            });
            console.log(response.data);

            setuserAlarmDatas(response.data);
            // setOffset(offset + 1); // offset을 상태 업데이트로 증가
        } catch (e) {
            console.log("알람 데이터 불러오기 실패", e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const historyYear = format(currentMonth, 'yyyy');
            const historyMonth = format(currentMonth, 'MM');
            const historydata = {
                solYear: historyYear,
                solMonth: historyMonth
            };

            await getHistoryData(historydata);
            if (!userId) return; // 유저 아이디가 없으면 요청하지 않음
            const currentYearMonth = format(currentMonth, 'yyyy-MM');
            await getEventData(currentYearMonth, userId); // 유저 아이디 추가
        };

        fetchData();
    }, [currentMonth, userId]);

    const getHistoryData = async (historydata) => {
        console.log("공휴일 API 호출");
        try {
            const response = await api.get(`api/history`, { params: historydata });
            console.log("debug >>> axios get response data : ", response);
        } catch (err) {
            console.log(err);
        }
    };

    const getEventData = async (currentYearMonth) => {
        console.log("불러오는중");
        console.log("데이터 저장한 후 : " + dateId + userId);
        try {
            const response = await api.get(`events/index/${currentYearMonth}`, {
                params: { userId: userId } // 유저 아이디를 요청에 포함
            });
            setEventDatas(response.data);
            console.log("이번달 데이터 : " + eventDatas);



        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (userId) {
            getData(dateId);
        }
    }, [dateId, userId]);

    const getData = async (dateId) => {
        if (!userId) return;

        try {
            const response = await api.get(`events/viewday/${dateId}`, {
                params: { userId: userId } // 유저 아이디를 요청에 포함
            });
            setEventData(response.data);
            console.log("해당 날짜에 속하는 데이터들" + response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day, id) => {
        setDateId(id);
        setSelectedDate(day);
        setShowEventView(true);
        setShowEventView(true);

    };

    const toggleEventView = () => {
        setShowEventView(!showEventView);
    };

    const DeleteHandler = async (id, title) => {
        try {
            if (window.confirm(`${title}을(를) 삭제하시겠습니까?`)) {
                await api.delete(`/events/delete/${id}`);
                getData(dateId);
                const currentYearMonth = format(currentMonth, 'yyyy-MM');
                getEventData(currentYearMonth, userId); // 유저 아이디를 포함
            }
        } catch (err) {
            console.error(err);
        }
    };

    const addModal = () => {
        setShowModal(true);
    };

    const UpdateModal = (listId) => {
        console.log("업데이트시 전달된 객체 아이디 : " + listId);


        setListId(listId);
        setShowUpdateModal(true);
    };

    const currentYear = format(selectedDate, 'yyyy');
    const currentMonthFormatted = format(selectedDate, 'M');
    const currentDay = format(selectedDate, 'd');
    const currentWeekday = format(selectedDate, 'EEEE', { locale: ko });

    // LastEvents 배열을 업데이트하는 함수
    const updateLastEvents = (index) => {
        setuserAlarmDatas(prevAlarmDatas => prevAlarmDatas.filter((_, i) => i !== index));        
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    eventDatas={eventDatas}
                    updateLastEvents={updateLastEvents}
                    getEventData={getEventData}
                    getData={getData}
                />
            </div>

            {showEventView && (
                <div style={{ width: '100%', height: '100%' }}>
                    <div className={`eventview ${showEventView ? 'active' : ''}`}>
                        <EventView
                            currentMonth={currentMonth}
                            currentMonthFormatted={currentMonthFormatted}
                            currentDay={currentDay}
                            currentWeekday={currentWeekday}
                            currentYear={currentYear}
                            showEventView={showEventView}
                            toggleEventView={toggleEventView}
                            getUserAlarmDatas={getUserAlarmDatas}
                            userAlarmDatas={userAlarmDatas} // 3개월전 데이터 알림으로? 
                        />
                        <TodoList
                            data={eventData}
                            onDelete={DeleteHandler}
                            currentMonth={currentMonth}
                            dateId={dateId}
                            UpdateModal={UpdateModal}
                            addModal={addModal}
                        />

                    </div>
                </div>
            )}

            {showmodal && (
                <>
                    <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
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
                </>
            )}

            {showUpdateModal && (
                <>
                    <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}></div>
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
                </>
            )}
        </div>
    );
};

export default Calendar;
