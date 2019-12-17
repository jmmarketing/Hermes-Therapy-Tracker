import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Table
} from "reactstrap";

import withAuth from "../../components/withAuth";
import API from "../../utils/API";

class SessionTable extends React.Component {

  state = {
    sessions: [],
    child: []
  }

  componentDidMount() {
    const href = window.location.href.split("/");

    API.getOneChild(href[href.length - 1]).then((res) => {
      // Sorts sessions in order of date
      let sessions = res.data.sessions;
      sessions.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      this.setState({
        sessions: res.data.sessions,
        child: res.data
      });
    });
  }

  showSessions(arr) {
    if (arr.length === 0) {

      return (
        <Card>
          <CardBody className="text-center">
            <CardTitle><h3>There Currently Are No Sessions.</h3></CardTitle>
            <CardText>After you track your first session you will be able to view all your past sessions here. </CardText>
            <Button href={`../newSession/${this.state.child._id}`} className=" btn-primary">
              Track Session
            </Button>
          </CardBody>
        </Card>
      );

    } else {

      return (
        <Card>
          <CardHeader>
            <h5 className="title float-left">Sessions</h5>
            <Button href={`../newSession/${this.state.child._id}`} className="btn-sm btn-primary float-right">
              Track Session
            </Button>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th className="text-center">Has Notes</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sessions.map((session) =>
                  <tr key={session._id}>
                    <td>{session.date.slice(0, 10)}</td>
                    <td className="text-center">{session.notes.length > 0 ? <i className="nc-icon nc-paper"/> : ""}</td>
                    <td className="text-center">
                      <Button href={`../viewSession/${session._id}`} color="info" size="sm">
                        View Session
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    }
  }

  render() {
    return (
      <>
  
        {this.showSessions(this.state.sessions)}
      </>
    );
  }

}

export default withAuth(SessionTable);