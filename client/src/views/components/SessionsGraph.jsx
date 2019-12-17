/* eslint-disable react/prop-types */
import React from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle
  
} from "reactstrap";

import withAuth from "../../components/withAuth";
import API from "../../utils/API";

class SessionsGraph extends React.Component {
  state = {
    sessions: [],
    data: {},
    options: {}
  }
  
  componentDidMount() {
    API.getChildSessions(this.props.childId)
      .then(res => {

        // Sorts sessions in order of date
        let sessions = res.data;
        sessions.sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        });

        this.setState({
          sessions: sessions
        });

        this.setData(sessions);
        this.setOptions();
      });
  }

  setData(sessions) {
    // Gets array of dates for labels
    let sessionDates = [];
    let positiveInteractions = [];
    let appropriateRequests = [];
    let appropriateResponse = [];
    sessions.map(session => {
      sessionDates.push(session.date.slice(0, 10));
      positiveInteractions.push(session.positiveInteractions);
      appropriateRequests.push(session.appropriateRequests);
      appropriateResponse.push(session.appropriateResponse);
    });
    
    this.setState( { data: {
      labels: sessionDates,
      datasets: [{
        label: "Positive Interactions",
        fill: false,
        lineTension: 0.1,
        borderColor: "#007bff",
        borderCapStyle: "butt",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "black",
        pointHoverBorderWidth: 2,
        data: positiveInteractions,
      }, {
        label: "Appropriate Requests",
        fill: true,
        lineTension: 0.1,
        borderColor: "#51cbce",
        borderCapStyle: "butt",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "black",
        pointHoverBorderWidth: 2,
        data: appropriateRequests,
      },
      {
        label: "Appropriate Responses",
        fill: true,
        lineTension: 0.1,
        borderColor: "#6bd098",
        borderCapStyle: "butt",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "black",
        pointHoverBorderWidth: 2,
        data: appropriateResponse,
      }]
    }});
  }

  setOptions() {
    this.setState({
      options:{
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            },
            scaleLabel: {
              display: true,
              labelString: "Number of Actions",
              fontSize: 20 
            }
          }]            
        }  
      }
    });
  }


  render() {
    return (
      <>
        {this.state.sessions.length > 0 ?
          <Card className="card-chart text-center">
            <CardBody>
              <CardTitle ><h3>Session Progress</h3></CardTitle>
              <Line
                data={this.state.data}
                options={this.state.options}
              /> 
            </CardBody>
          </Card> :
          <></>
        }
      </>
    );
  }
}

export default withAuth(SessionsGraph);