import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import NotFound from '../../notFound/404'
import Calendar from '../Calendar/Calendar'
import { useParams, useHistory } from 'react-router'

export default function DateFilter() {
  let {date}  = useParams<dateParams>()
  const [year, month] = date.split("-")
  const accessToken = process.env.TOKEN
  const history = useHistory()
  const [monthData, setmonthData] = useState([])
  const [pageWillLoad, setpageWillLoad] = useState(true)
  const lastDay = new Date(parseInt(year),parseInt(month),0).getDate()

  const query = `{
      diaCollection(where:{
        AND:[
        {fecha_gte:"${year}-${month}-01"}
        {fecha_lte:"${year}-${month}-${lastDay}"}
      ]
      },
      order: fecha_ASC
      ){
        items{
          noticia
          urlNoticia
          fecha
        }
      }
    }`

  useEffect(() => {
    let response
    try {
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
