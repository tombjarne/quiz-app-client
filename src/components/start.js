import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import { useStores } from "../stores/useStores";

import { Jumbotron, Container, Button } from 'reactstrap';

import QuizPreview from "./quiz/quizPreview";

const Start = () => {

  const { quizStore } = useStores();
  const [quiz, setQuiz] = useState( null );

  const getQuiz = async () => {

    await quizStore.getRandomQuiz()
     .then( response => {
       setQuiz( response );
     } )
  }

  return (
   <section>
     {
       quiz === null &&
       (
        <Jumbotron flex>
          <Container flex>
            <h1 className="display-1">Quiz</h1>
            <p className="lead">Start quizzing today!</p>
            <Button color="primary" onClick={ () => getQuiz() }>Begin</Button>
          </Container>
        </Jumbotron>
       )
     }
     {
       quiz !== null &&
       (
        <QuizPreview quiz={ quiz }/>
       )
     }
   </section>
  )
}

export default withRouter( Start )
