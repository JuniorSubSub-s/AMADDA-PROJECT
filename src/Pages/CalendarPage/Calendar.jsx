import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
<<<<<<< HEAD
import RenderHeader from './RenderHeader';
import RenderDays from './RenderDays';
import RenderCells from './RenderCells';
import './calendar.css'; // SCSS 대신 CSS 파일을 import
import './Event.css'; // SCSS 대신 CSS 파일을 import
import EventView from "./EventView";
import TodoList from "./TodoList";
import TodoAddBtn from "./TodoAddBtn";
import { ko } from 'date-fns/locale';
import api from "../../api/axios";
import TodoWritePage from "./TodoWritePage";
import './Modal.css'; // SCSS 대신 CSS 파일을 import
import EventUpdate from "./EventUpdate";
import LastEvents from './LastEvnets';
=======
import { ko } from 'date-fns/locale';

import api from "../../api/axios";

import RenderHeader from '../../components/CalendarPage/RenderHeader';
import RenderDays from '../../components/CalendarPage/RenderDays';
import RenderCells from '../../components/CalendarPage/RenderCells';
import EventView from "../../components/CalendarPage/EventView";
import TodoList from "../../components/CalendarPage/TodoList";
import TodoAddBtn from "../../components/CalendarPage/TodoAddBtn";
import { ko } from 'date-fns/locale';
import api from "../../api/axios";
import TodoWritePage from "../../components/CalendarPage/TodoWritePage";
import EventUpdate from "../../components/CalendarPage/EventUpdate";

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateId, setDateId] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [eventData, setEventData] = useState([]);
    const [eventDatas, setEventDatas] = useState([]);
    const [showEventView, setShowEventView] = useState(false);
    const [showmodal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [listId, setListId] = useState("");
    const [userId, setUserId] = useState("1"); // 유저 아이디 상태 추가

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
<<<<<<< HEAD
            
=======
            console.log("이번달 데이터 : " + eventDatas);


>>>>>>> 65ab65c0eafc6ae29c51218780513d0e319ea496
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
<<<<<<< HEAD
=======
            console.log("해당 날짜에 속하는 데이터들" + response.data);

>>>>>>> 65ab65c0eafc6ae29c51218780513d0e319ea496
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
<<<<<<< HEAD
        setShowEventView(true);        
=======
        setShowEventView(true);
>>>>>>> 65ab65c0eafc6ae29c51218780513d0e319ea496
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
<<<<<<< HEAD
=======
        console.log("업데이트시 전달된 객체 아이디 : " + listId);

>>>>>>> 65ab65c0eafc6ae29c51218780513d0e319ea496
        setListId(listId);
        setShowUpdateModal(true);
    };

    const currentYear = format(selectedDate, 'yyyy');
    const currentMonthFormatted = format(selectedDate, 'M');
    const currentDay = format(selectedDate, 'd');
    const currentWeekday = format(selectedDate, 'EEEE', { locale: ko });

    return (
        <div className="calendar-container">
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays showEventView={showEventView} />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    eventDatas={eventDatas}
                    showEventView={showEventView}
                />
            </div>

            {showEventView && (
                <div>
                    <div className={`eventview ${showEventView ? 'active' : 'test'}`}>
                        <EventView
                            currentMonth={currentMonth}
                            currentMonthFormatted={currentMonthFormatted}
                            currentDay={currentDay}
                            currentWeekday={currentWeekday}
                            currentYear={currentYear}
                            showEventView={showEventView}
                            toggleEventView={toggleEventView}
                            eventDatas={eventDatas}
                        />
                        <TodoList
                            data={eventData}
                            onDelete={DeleteHandler}
                            currentMonth={currentMonth}
                            dateId={dateId}
                            UpdateModal={UpdateModal}
                        />
                        <TodoAddBtn
                            dateId={dateId}
                            currentMonth={currentMonth}
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
