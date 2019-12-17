import React from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import therapists from "./../../therapists.json";

function Therapists () {

  return (
    <div className="content">
      <Container>
        {/* ############# THERAPIST INFO CARD ################ */}
        <h2><i className="fa fa-user-md"></i> Meet the Therapists! </h2>
        {therapists.map(therapist => 
        { return (
          <Card key={therapist.id}>
            <CardBody>
              <Row key={Math.floor(Math.random() * 20)}>
                <Col md="2">
                  <img src={therapist.img} alt={therapists.name}/>
                </Col>
                <Col md="7">
                  <h6 className="text-primary"> {therapist.name}, {therapist.title}. <i className="nc-icon nc-badge"></i></h6>
                  <p ><i className="nc-icon nc-mobile"> </i> <strong>Number: </strong> {therapist.phoneNumber}</p>
                  <p ><i className="nc-icon nc-email-85"></i> <strong>Email: </strong> {therapist.email}</p>
                  <p ><i className="nc-icon nc-map-big"></i> <strong>Location: </strong> {therapist.location}</p>
                </Col>
                <Col md="3">
                                            
                  <img className="float=left"src="https://www.healthdesign.org/sites/default/files/styles/responsive_image/public/pebble/partners/childrens.2color.jpg" alt={therapist.location}/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
        }
        )
        }
                        
                    
      </Container>
    </div>
  );
}

export default Therapists;
