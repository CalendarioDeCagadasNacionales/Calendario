import React from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"
import DateFilter from '../components/DateFilter/DateFilter'
import "./app.scss"

export default function App() {
    let currentDate = new Date()
    let month = currentDate.getMonth()+1
    let redirectDate = `/${currentDate.getFullYear()}-${month <= 9 ? "0"+month.toString() : month }`

    return (
        <HashRouter>
          <Switch>
            <Route path="/:date">
              <DateFilter/>
            </Route>
            <Route path="*">
              <Redirect to={redirectDate}/>
            </Route>
          </Switch>
        </HashRouter>
    )
}
