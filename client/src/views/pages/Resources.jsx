import React from "react";
import ResourcesCard from "../components/cards/ResourcesCard";
import resources from "../../resources.json";
// reactstrap components
import {
  Row
} from "reactstrap";


class Resources extends React.Component {

    state = {
      resources
    };


    render() {
      return (
            <>
                <div className="content">
                  <Row>
                    {this.state.resources.map(resource => (
                      <ResourcesCard
                        key={resource.id}
                        img={resource.img}
                        title={resource.title}
                        brief={resource.brief}
                        id={resource.id}
                        category={resource.category}
                      />

                    ))}

                  </Row>
                </div>
            </>
      );
    }
}

export default Resources;
