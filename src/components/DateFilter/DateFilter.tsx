import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useHistory } from 'react-router'
import Layout from '../Layout/Layout'
import NotFound from '../../notFound/404'
import Calendar from '../Calendar/Calendar'
import { queryTemplate } from '../../utils/Helper'

export default function DateFilter() {
  const {date}  = useParams<dateParams>()
  const [year, month] = date.split("-")
  const accessToken = process.env.TOKEN
  const history = useHistory()
  const [monthData, setmonthData] = useState([])
  const [pageWillLoad, setpageWillLoad] = useState(true)
  const query = useMemo(() => queryTemplate(year, month), [year,month])

  useEffect(() => {
    try {
      let response
      const fetchMonthData = async () => {
         response = await fetch(`https://graphql.contentful.com/content/v1/spaces/gbvho13kntsg`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({ query }),
                })
        response = await response.json()
        let dates: string[] = await response.data.diaCollection.items
        if (!dates.length) {
          setpageWillLoad(false)
        } else {
          setmonthData(dates)
          setpageWillLoad(true)
        }
      }
      fetchMonthData()
    } catch (error) {
      setpageWillLoad(false)
    }
  }, [query])

  useEffect(() => {
    switch (month) {
      case "13":
        history.push(`/${parseInt(year)+1}-01`)
        break
      case "00":
        history.push(`/${parseInt(year)-1}-12`)
        break
    }
  }, [date])

  if (pageWillLoad) {
      return(
        <Layout>
          <Calendar month={month} year={year} data={monthData}/>
        </Layout>
      )
    } else {
      return (
        <NotFound/>
      )
    }
}
