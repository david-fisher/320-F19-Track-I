import React from 'react';
import { Col, Row, Card, Accordion } from 'react-bootstrap';
import { Timeline } from 'react-twitter-widgets';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      editting: false,
      observations: []
    };
  }

  componentDidMount() {
    // fetch description from Lambdas?
    this.setState({
      description:
        'OrchardWatch, defender of apples, slayer of apple scab, your friendly neighborhood hero!'
    });
    this.setState({
      observations: [
        {
          title: 'Some Announcement',
          description: 'Some Description'
        },
        {
          title: 'Another Announcement',
          description: 'Another Description'
        },
        {
          title: 'Yet Another Announcement',
          description: 'Yet Another Description'
        },
        {
          title: 'Some Random Announcement',
          description: 'blah, blah, blah\nblah\n\nblah'
        }
      ]
    });
  }

  render() {
    let description = this.state.description.split('\n').map((line, key) => {
      return (
        <span key={key}>
          {line}
          <br />
        </span>
      );
    });
    let tweets = (
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'iamdevloper'
        }}
        options={{
          username: 'iamdevloper',
          height: '500',
          width: '250'
        }}
      />
    );
    let list = this.state.observations.map((e, index) => {
      let announcementDescription = e.description
        .split('\n')
        .map((line, key) => {
          return (
            <span key={key}>
              {line}
              <br />
            </span>
          );
        });
      return (
        <Card key={index}>
          <Card.Header>{e.title}</Card.Header>
          <Card.Body>{announcementDescription}</Card.Body>
        </Card>
      );
    });
    return (
      <div>
        <Row>
          <Col>
            <p>{description}</p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md='8'>
            <Accordion>{list}</Accordion>
          </Col>
          <Col>{tweets}</Col>
        </Row>
      </div>
    );
  }
}

export default Home;
