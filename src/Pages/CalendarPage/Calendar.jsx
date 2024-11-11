import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import api from "../../api/axios";

import RenderHeader from '../../components/CalendarPage/RenderHeader';
import RenderDays from '../../components/CalendarPage/RenderDays';
import RenderCells from '../../components/CalendarPage/RenderCells';
import EventView from "../../components/CalendarPage/EventView";
import TodoList from "../../components/CalendarPage/TodoList";
import TodoAddBtn from "../../components/CalendarPage/TodoAddBtn";

import TodoWritePage from "../../components/CalendarPage/TodoWritePage";
import EventUpdate from "../../components/CalendarPage/EventUpdate";

import './calendar.css'; // SCSS 대신 CSS 파일을 import
import '../../components/CalendarPage/Event.css'; // SCSS 대신 CSS 파일을 import
import '../../components/CalendarPage/Modal.css'; // SCSS 대신 CSS 파일을 import

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

    useEffect(() => {
        const fetchData = async () => {
            const historyYear = format(currentMonth, 'yyyy');
            const historyMonth = format(currentMonth, 'MM');
            const historydata = {
                solYear: historyYear,
                solMonth: historyMonth
            };

            await getHistoryData(historydata);
            const currentYearMonth = format(currentMonth, 'yyyy-MM');
            await getEventData(currentYearMonth);
        };

        fetchData();
    }, [currentMonth]);

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
        try {
            const response = await api.get(`events/index/${currentYearMonth}`);
            setEventDatas(response.data);
            console.log("이번달 데이터 : " + eventDatas);


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData(dateId);
    }, [dateId]);

    const getData = async (dateId) => {
        try {
            const response = await api.get(`events/viewday/${dateId}`);
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
                getEventData(currentYearMonth);
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
