import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import axios from 'axios';

class Home extends Component {
  state = { polls: [] };

  componentDidMount() {
    axios.get('/polls')
      .then(response => {
        const data = response.data.data;
        this.setState({
          polls: data
        });
      });
  }

  render() {
    return (
      <div style={{ paddingTop: 120 }}>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
                <Row>
                  <Col xs={4} xsOffset={4}>
                    <h3>Polls</h3>
                  </Col>
                  <Col xs={2} xsOffset={2}>
                    <small><Link to="/new-poll">{'new poll'}</Link></small>
                  </Col>
                </Row>
              <hr />
               <List
                  itemLayout="horizontal"
                  dataSource={this.state.polls}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<div>{item.name}{' '}<small><Link to={"/" + item.id}>vote</Link>{' | '}<Link to={`/${item.id}/rankings`}>rankings</Link></small></div>}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
