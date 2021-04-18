import React from 'react';
import { withRouter } from "react-router-dom";

import {
  Card, CardBody,
  CardTitle, CardSubtitle, Toast, ToastBody,
  ToastHeader, Button
} from 'reactstrap';

import "../../assets/css/quiz.css";

const Questions = ( { question, callback } ) => {

  console.log( question );

  return (
   <div>
     <Card>
       <CardBody>
         <CardTitle tag="h2">{ question.title }</CardTitle>
         <CardSubtitle tag="h6" className="mb-2 text-muted">{ question.type } question</CardSubtitle>
         <article className="flex all-centered wrap">
           { question.answers.map( answer =>
            <Toast key={ answer.id }>
              <ToastHeader icon="secondary">
                Option { question.answers.indexOf( answer ) + 1 }
              </ToastHeader>
              <ToastBody>
                <Button className="answer-option"
                        color="info" onClick={ () => callback( answer.id ) }>{ answer.value }</Button>
              </ToastBody>
            </Toast>
           ) }
         </article>
       </CardBody>
     </Card>
   </div>
  )
}

export default withRouter( Questions );
