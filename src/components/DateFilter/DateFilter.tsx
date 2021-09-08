import React from 'react'
import Layout from '../Layout/Layout'
import NotFound from '../../notFound/404'
import Calendar from '../Calendar/Calendar'
import { useParams } from 'react-router'

export default function DateFilter() {
    let {date}  = useParams<dateParams>()
    let [year, month] = date.split("-")

    if (parseInt(month) > 12 || parseInt(month) === 0) {
      return(
          <NotFound/>
      )
    } else {
      return (
        <Layout>
          <Calendar month={month} year={year}/>
        </Layout>
      )
    }
}
