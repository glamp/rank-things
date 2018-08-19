import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Col, Row } from 'antd';

export default ({ links, share }) => (
  <Row>
    <Col span={4} offset={20}>
      <small>
        {
          links.map((link, idx) => {
            return (
              <span>
                <Link to={link.href}>{link.title}</Link>
                { idx+1 !== links.length ? ' | ' : '' }
              </span>
            );
          })
        }
      </small>
    </Col>
  </Row>
);
