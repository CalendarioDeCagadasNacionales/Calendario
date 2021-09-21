import React, { useEffect, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Calendar.scss';
import { padzero } from '../../utils/Helper';

const monthList = ['Enero', 'Febrero', 'Marzo', 'Mayo', 'Abril', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miecoles', 'Jueves', 'Viernes', 'Sabado'];

export default function Calendar(props) {
  const previousMonth = useMemo(() => padzero(props.month, false), props.month);
  const nextMonth = useMemo(() => padzero(props.month, true), props.month);
  const lastDayOfMonth = new Date(props.year, props.month, 0).getDate();

  // Gets the first and the last day of the passed month, gets the first day of current month (-1 because Date is 0 indexed)
  // Then maps it to an array where it gets all dates desending from the last day of the pased month
  // Reverses the array and takes out the 0 index and then is maped to be displayed
  const firstDayOfMonth = new Date(props.year, props.month - 1, 1).getDay();
  const LastDayOfPassedMonth = new Date(props.year, props.month - 2, 0).getDate();
  const lastDaysPastMonth = [];
  for (let index = 0; index < firstDayOfMonth + 1; index++) {
    lastDaysPastMonth.push(LastDayOfPassedMonth - index);
  }
  lastDaysPastMonth.reverse();
  lastDaysPastMonth.shift();
  const lastDaysPastMonthDisplayed = lastDaysPastMonth.map((lastDaysPastMonthDisplayed) => (
    <div className="day-cell different-month-day" key={lastDaysPastMonthDisplayed.toString()}>{lastDaysPastMonthDisplayed}</div>
  ));

  // The minus one is because Date() with integers is 0 indexed, if you put 0 you will get Jaunary and so on
  const daysToCompconste = new Date(props.year, props.month - 1, lastDayOfMonth).getDay();
  // Makes an array with all the missing days in next the month to compconste the week
  // and then maps it to put te multiple html items
  const daysToCompconsteArray = [];
  for (let index = 0; index < 7 - daysToCompconste; index++) {
    daysToCompconsteArray.push(index);
  }
  daysToCompconsteArray.shift();
  const daysToCompconsteDisplayed = daysToCompconsteArray.map((daysToCompconsteArray) => (
    <div className="day-cell different-month-day" key={daysToCompconsteArray.toString()}>{daysToCompconsteArray}</div>
  ));

  // Makes an array with all the days in the month and then maps it to put te multiple html items
  const daysInMonth = [];
  for (let index = 0; index < lastDayOfMonth + 1; index++) {
    daysInMonth.push(index);
  }
  daysInMonth.shift();
  const noticiaText = props.data.map((a) => a.noticia);
  const noticiaUrl = props.data.map((a) => a.urlNoticia);
  const daysDisplayed = daysInMonth.map((daysInMonth) => (
    <div className="day-cell" key={daysInMonth.toString()}>
      {daysInMonth}
      <a href={noticiaUrl[daysInMonth - 1]} target="_blank" data-tip={noticiaText[daysInMonth - 1]} rel="noreferrer">
        {noticiaText[daysInMonth - 1]}
      </a>
      <ReactTooltip place="right" effect="solid" border borderColor="#0a0a0a" backgroundColor="#0a0a0a" />
    </div>
  ));

  const daysInWeek = weekDays.map((day) => (
    <div className="calendar-days" key={day.toString()}>{day}</div>
  ));

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Link style={{ textDecoration: 'none', color: 'white' }} to={`/${props.year}-${previousMonth}`}>
          <AiFillCaretLeft style={{ margin: '0px' }} />
        </Link>
        <span>
          {monthList[props.month - 1]} - {props.year}
        </span>
        <Link style={{ textDecoration: 'none', color: 'white' }} to={`/${props.year}-${nextMonth}`}>
          <AiFillCaretRight style={{ margin: '0px' }} />
        </Link>
      </div>
      {daysInWeek}
      {lastDaysPastMonthDisplayed}
      {daysDisplayed}
      {daysToCompconsteDisplayed}
    </div>
  );
}
