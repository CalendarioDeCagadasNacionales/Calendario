import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import NotFound from '../../notFound/404'
import Calendar from '../Calendar/Calendar'
import { useParams } from 'react-router'

export default function DateFilter() {
  let {date}  = useParams<dateParams>()
  let [year, month] = date.split("-")
  const [monthData, setmonthData] = useState([])
  const [pageWillLoad, setpageWillLoad] = useState(true)
  const lastDay = new Date(parseInt(year),parseInt(month),0).getDate()

  const query = `{
      diaCollection(where:{
        AND:[
        {fecha_gte:"${year}-${month}-01"}
        {fecha_lte:"${year}-${month}-${lastDay}"}
      ]
      }){
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
                    Authorization: "Bearer cYi4Cxr8OMOh64p5eXO7HQESzk-g0W7ZhNYN2x3T9u4",
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

// GraphiQL contentful api: https://graphql.contentful.com/content/v1/spaces/gbvho13kntsg/explore?access_token=cYi4Cxr8OMOh64p5eXO7HQESzk-g0W7ZhNYN2x3T9u4

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
