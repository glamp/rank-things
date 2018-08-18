import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Button, Table, Input } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const InputGroup = Input.Group;

class Home extends Component {
  state = { name: '', data: [] };

  createPoll = () => {
    const data = this.state;
    if (!data.name) {
      alert("Please give your poll a name!");
      return;
    }
    if (data.data.length===0) {
      alert("Please provide some things to rank!");
      return;
    }

    axios.post('/polls', data)
      .then(response => {
        console.log(response);
        window.location.redirect('/');
      })
  }

  addItemManually = () => {
    const newItem = {
      title: this.state.manualItemTitle,
      description: this.state.manualItemDescription
    };
    this.setState({
      manualItemTitle: '',
      manualItemDescription: '',
      data: this.state.data.concat([newItem])
    });
  }

  csvJSON(csv){

    let lines=csv.split("\n");
    let result = [];
    let headers=lines[0].split(",");

    for(let i=1;i<lines.length;i++){
      let obj = {};
      let currentline=lines[i].split(",");
      for(let j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result; //JavaScript object
  }

  setContent = (value) => {
    const data = this.csvJSON(value).filter(x => x.title);
    this.setState({ data });
  }

  render() {
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      }
    ];

    const placeholderForCSV = [
      "title,description",
      "red,red is the color of love",
      "blue,blue is the color of sadness",
      "green,green is the color of life"
    ].join('\n');

    return (
      <div style={{ paddingTop: 40, margin: 20 }}>
        <center><h3>Create a New Poll</h3></center>
        <hr />
        <Row>
          <Col xs={3} xsOffset={1}>
            <div>
              <p><b>Give your poll a name</b></p>
              <Input
                placeholder="Colors"
                onChange={evt => this.setState({ name: evt.target.value })}
              />
            </div>
            <br />
            <div>
              <p><b>Add some things to rank</b></p>
              <InputGroup>
                <Row>
                  <Col span={5}>
                    <Input
                      value={this.state.manualItemTitle}
                      placeholder="title"
                      onChange={evt => this.setState({ manualItemTitle: evt.target.value })}
                    />
                  </Col>
                  <Col span={8}>
                    <Input  
                      value={this.state.manualItemDescription}
                      placeholder="description"
                      onChange={evt => this.setState({ manualItemDescription: evt.target.value })}
                    />
                  </Col>
                  <Col span={2}>
                  <Button type="primary" icon="plus" onClick={this.addItemManually} />
                  </Col>
                </Row>
              </InputGroup>
            </div>
            <hr />
            <div>
              <p><b>Or import a bunch</b></p>
              <TextArea
                placeholder={placeholderForCSV}
                rows={20}
                onChange={evt => this.setContent(evt.target.value)}
              />
            </div>
          </Col>
          <Col xs={6} xsOffset={1}>
            <div>
              <center><h4>{this.state.name}</h4></center>
              <hr />
              <Table
                className="preview-table"
                dataSource={this.state.data}
                columns={columns}
                pagination={false}
              />
              <br />
              <center>
                <Button type="primary" onClick={this.createPoll}>Create</Button>
              </center>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;