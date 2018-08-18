import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { Icon, Table } from 'antd';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import axios from 'axios';

class Home extends Component {
  state = { rankings: [] };

  componentDidMount() {
    axios.get('/rankings/' + this.props.pollId)
      .then(response => {
        const data = response.data.data;
        this.setState({
          rankings: data
        });
      });
  }

  render() {
    const columns = [
      {
        title: '',
        key: 'eloHistory',
        dataIndex: 'eloHistory',
        render: item => {
          console.log(item);
          if (item[item.length - 2] < item[item.length - 1]) {
            return <Icon type="arrow-up" style={{ color: 'green' }} />;
          }
          if (item[item.length - 2] > item[item.length - 1]) {
            return <Icon type="arrow-down" style={{ color: 'red' }} />;
          }
          return <Icon type="minus" />;
        }
      },
      {
        title: 'Rank',
        key: 'rank',
        dataIndex: 'rank',
      },
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
      },
      {
        title: 'Rating',
        key: 'elo',
        dataIndex: 'elo',
      },
      {
        title: '',
        key: 'eloHistory',
        dataIndex: 'eloHistory',
        width: 150,
        render: item => {
          return (
            <Sparklines data={item} height={20}>
              <SparklinesLine color="steelblue" />
              <SparklinesReferenceLine  value={1400} />
            </Sparklines>
          );
        }
      },
    ];
    return (
      <div style={{ paddingTop: 120 }}>
        <div className="center">
          <Row>
            <Col xs={4} xsOffset={4}>
              <h3>Rankings</h3>
            </Col>
            <Col xs={2} xsOffset={2}>
              <small>
                <Link to={'/' + this.props.pollId}>{'rank more matchups'}</Link>
                {' | '}
                <Link to="/">{'rank something else'}</Link>
              </small>
            </Col>
          </Row>
          <hr />
        </div>
        <Row>
          <Col xs={4} xsOffset={4}>
            <Table
              size="small"
              pagination={false}
              dataSource={this.state.rankings}
              columns={columns}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
