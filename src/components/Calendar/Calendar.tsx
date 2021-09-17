import React from 'react'
import { useEffect, useMemo } from 'react'
import ReactTooltip from 'react-tooltip'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import { Link } from 'react-router-dom'
import "./Calendar.scss"

export default function Calendar(props) {
    const monthList = ["Enero","Febrero","Marzo","Mayo","Abril","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    const weekDays = ["Domingo","Lunes","Martes","Miecoles","Jueves","Viernes","Sabado"]
    const previousMonth = useMemo(() => parseInt(props.month)-1 <= 9 ? "0"+(parseInt(props.month)-1) : parseInt(props.month)-1, props.month )
    const nextMonth = useMemo(() => parseInt(props.month)+1 <= 9 ? "0"+(parseInt(props.month)+1) : parseInt(props.month)+1, props.month)
    let lastDayOfMonth = new Date(props.year,props.month,0).getDate()

    // Gets the first and the last day of the passed month, gets the first day of current month (-1 because Date is 0 indexed)
    // Then maps it to an array where it gets all dates desending from the last day of the pased month
    // Reverses the array and takes out the 0 index and then is maped to be displayed
    let firstDayOfMonth = new Date(props.year,props.month-1,1).getDay()
    let LastDayOfPassedMonth = new Date(props.year,props.month-2,0).getDate()
    let lastDaysPastMonth = []
    for (let index = 0; index < firstDayOfMonth+1; index++) {
      lastDaysPastMonth.push(LastDayOfPassedMonth-index)
    }

    lastDaysPastMonth.reverse()
    lastDaysPastMonth.shift()
    let lastDaysPastMonthDisplayed = lastDaysPastMonth.map((lastDaysPastMonthDisplayed) => (
      <div className="day-cell different-month-day" key={lastDaysPastMonthDisplayed.toString()}>{lastDaysPastMonthDisplayed}</div>
    ))

    // The minus one is because Date() with integers is 0 indexed, if you put 0 you will get Jaunary and so on
    let daysToComplete = new Date(props.year,props.month-1,lastDayOfMonth).getDay()
    // Makes an array with all the missing days in next the month to complete the week 
    // and then maps it to put te multiple html items
    let daysToCompleteArray = []
    for (let index = 0; index < 7-daysToComplete; index++) {
      daysToCompleteArray.push(index)
    }
    daysToCompleteArray.shift()
    let daysToCompleteDisplayed = daysToCompleteArray.map((daysToCompleteArray) => (
      <div className="day-cell different-month-day" key={daysToCompleteArray.toString()}>{daysToCompleteArray}</div>
    ))

    // Makes an array with all the days in the month and then maps it to put te multiple html items
    //let daysInMonth = Array(lastDayOfMonth+1).fill(0).map((_, i) => i)
    let daysInMonth = []
    for (let index = 0; index < lastDayOfMonth+1; index++) {
      daysInMonth.push(index)
    }
    daysInMonth.shift()
    let noticiaText = props.data.map(a => a.noticia)
    let noticiaUrl = props.data.map(a => a.urlNoticia)
    let daysDisplayed = daysInMonth.map((daysInMonth) => (
      <div className="day-cell" key={daysInMonth.toString()}>
        {daysInMonth}
        <a href={noticiaUrl[daysInMonth-1]} target="_blank" data-tip={noticiaText[daysInMonth-1]}>
          {noticiaText[daysInMonth-1]}
        </a>
        <ReactTooltip place="right" effect="solid" border={true} borderColor="#0a0a0a" backgroundColor="#0a0a0a"/>
      </div>
    ))

    const daysInWeek = weekDays.map((day)=>(
      <div className="calendar-days">{day}</div>
    ))

    useEffect(() => {
      ReactTooltip.rebuild();
    });

    return (
      <div className="calendar-container">
          <div className="calendar-header">
            <Link style={{textDecoration:"none", color:"white"}} to={`/${props.year}-${previousMonth}`}>
              <AiFillCaretLeft style={{margin:"0px"}}/>
            </Link>
            <span>{monthList[props.month-1]} - {props.year}</span>
            <Link style={{textDecoration:"none", color:"white"}} to={`/${props.year}-${nextMonth}`}>
              <AiFillCaretRight style={{margin:"0px"}}/>
            </Link>
          </div>
          {daysInWeek}
          {lastDaysPastMonthDisplayed}
          {daysDisplayed}
          {daysToCompleteDisplayed}
      </div>
    )
}
