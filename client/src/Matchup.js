import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './App.css';

class Matchup extends Component {
  state = { option1: {}, option2: {} };

  componentDidMount() {
    this.getMatchup();
  }

  getMatchup = () => {
    axios.get('/matchup/' + this.props.pollId)
      .then(response => {
        const data = response.data.data;
        this.setState({
          option1: data[0],
          option2: data[1],
        });
      });

  }

  vote = (winnerId, loserId) => {
    axios.post('/matchup/' + this.props.pollId, { winnerId, loserId })
      .then((response) => {
        // handle success
        console.log(response);
        this.getMatchup();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });

  }

  render() {
    const data = this.state; 
    const headerLinks = [
      { title: 'view the rankings', href: '/' + this.props.pollId + '/rankings' },
      { title: 'rank something else', href: '/' },
    ];
    return (
      <div style={{ paddingTop: 120 }}>
        <Header links={headerLinks} />
        <br />
        <Row gutter={16}>
          <Col span={8} offset={4}>
            <Card title={<h2>{data.option1.title}</h2>} bordered={true} className="center">
              <h3>{data.option1.description}</h3>
              <br />
              <Button onClick={() => this.vote(data.option1.id, data.option2.id)} type="primary">Vote</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title={<h2>{data.option2.title}</h2>} bordered={true} className="center">
              <h3>{data.option2.description}</h3>
              <br />
              <Button onClick={() => this.vote(data.option2.id, data.option1.id)} type="primary">Vote</Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Matchup;
