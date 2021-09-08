import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import DateFilter from '../components/DateFilter/DateFilter'
import "./app.scss"

export default function App() {
    let currentDate = new Date()
    let redirectDate = `/${currentDate.getFullYear()}-${currentDate.getMonth()+1}`

    return (
        <BrowserRouter>
          <Switch>
            <Route path="/:date">
              <DateFilter/>
            </Route>
            <Route path="*">
              <Redirect to={redirectDate}/>
            </Route>
          </Switch>
        </BrowserRouter>
    )
}
