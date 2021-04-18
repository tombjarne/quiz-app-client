import React from 'react';
import { withRouter } from "react-router-dom";

import {
  Card, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

import "../../assets/css/quiz.css";

const QuestionResult = ( { value } ) => {

  let output = value ? "right" : "wrong";

  return (
   <div>
     <Card>
       <CardBody>
         <CardTitle tag="h2">This answer was...</CardTitle>
         <CardSubtitle tag="h3" className="mb-2 text-muted">{ output } question</CardSubtitle>
       </CardBody>
     </Card>
   </div>
  )
}

export default withRouter( QuestionResult );
