import React from 'react'
import Layout from "../components/Layout/Layout"
import Calendar from '../components/Calendar/Calendar'
import { BrowserRouter, Route, Link, Switch, Redirect, useLocation, useParams} from "react-router-dom"
import "./app.scss"

export default function App() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/:id">
              <Layout>
                <Calendar />
              </Layout>
            </Route>
          </Switch>
        </BrowserRouter>
    )
}
