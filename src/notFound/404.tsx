import React from 'react'
import Layout from "../components/Layout/Layout"
import { Link } from 'react-router-dom'
import "./404.scss"

export default function NotFound() {
    let currentDate = new Date()
    let redirectDate = `/${currentDate.getFullYear()}-${currentDate.getMonth()+1}`
    return (
        <Layout>
            <div className="message">
                No poseemos este mes en nuestros archivos, puedes visitar el mes actual<Link to={redirectDate} style={{marginLeft:"0.5em"}}> aqui</Link>
            </div>
        </Layout>
    )
}
