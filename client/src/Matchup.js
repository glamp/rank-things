import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Mousetrap from 'mousetrap';
import axios from 'axios';
import Header from './Header';
import './App.css';

class Matchup extends Component {
  state = { option1: {}, option2: {} };

  componentDidMount() {
    this.getMatchup();

    // hotkeys
    Mousetrap.bind('left', () => {
      this.vote(this.state.option1.id, this.state.option2.id);
    });
    Mousetrap.bind('right', () => {
      this.vote(this.state.option2.id, this.state.option1.id);
    });
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
    const cardHeight = 250;
    return (
      <div className="center" style={{ paddingTop: 120 }}>
        <Header links={headerLinks} title={this.state.option1.poll_name} />
        <br />
        <Row gutter={16}>
          <Col md={{ span: 8, offset: 4 }}>
            <Card style={{ height: cardHeight }} title={<h3>{data.option1.title}</h3>} bordered={true} className="center">
              <p>{data.option1.description}</p>
              <br />
              <Button onClick={() => this.vote(data.option1.id, data.option2.id)} type="primary">Vote</Button>
            </Card>
          </Col>
          <Col md={8}>
            <Card style={{ height: cardHeight }} title={<h3>{data.option2.title}</h3>} bordered={true} className="center">
              <p>{data.option2.description}</p>
              <br />
              <Button onClick={() => this.vote(data.option2.id, data.option1.id)} type="primary">Vote</Button>
            </Card>
          </Col>
        </Row>
        <br />
        <p className="center">Pro Tip: Use the left and right arrow keys to vote!</p>
      </div>
    );
  }
}

export default Matchup;
