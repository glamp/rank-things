import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import axios from 'axios';
import Header from './Header';

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
      <div className="center" style={{ paddingTop: 120 }}>
        <Header title="Polls" links={[{ href: '/new-poll', title: 'new poll'}]} />
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
      </div>
    );
  }
}

export default Home;
