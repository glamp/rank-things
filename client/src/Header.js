import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title, links }) => (
  <div className="center">
    <h3>{title}</h3>
    <small>
      {
        links.map((link, idx) => {
          return (
            <span>
              <Link to={link.href}>{link.title}</Link>
              {' | '}
            </span>
          );
        })
      }
      <Link to="/how-does-this-work">{"how does this work?"}</Link>
    </small>
  </div>
);
