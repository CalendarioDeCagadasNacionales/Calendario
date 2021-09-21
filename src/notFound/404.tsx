import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './404.scss';

export default function NotFound() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const redirectDate = `/${currentDate.getFullYear()}-${month <= 9 ? `0${month.toString()}` : month}`;
  return (
    <Layout>
      <div className="message">
        No poseemos este mes en nuestros archivos, puedes visitar el mes actual
        <Link to={redirectDate} style={{ marginLeft: '0.5em' }}> aqui</Link>
      </div>
    </Layout>
  );
}
