import React from 'react';
import { RiCopyleftLine } from 'react-icons/ri';
import './Layout.scss';

export default function Layout({ children }) {
  return (
    <div className="main-container">
      <nav className="navbar">
        <h2>Calendario de cagadas nacionales 🇦🇷</h2>
      </nav>
      <section className="content-container">
        { children }
      </section>
      <footer className="footer-container">
        <p>
          Tenes alguna noticia que quieras contarnos? envíanosla a
          <a href="mailto:cagadasnacionalescontacto@gmail.com">cagadasnacionalescontacto@gmail.com</a>
          {' '}
          - 2021
          <RiCopyleftLine />
        </p>
      </footer>
    </div>
  );
}
