import React from "react";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";

import { Button, Container } from "reactstrap";
import { useStores } from "../../stores/useStores";

const QuizPreview = ( element ) => {

  const { quizStore } = useStores();
  const history = useHistory();

  const quiz = element.quiz;

  const startQuiz = async () => {
    await quizStore.getQuestions();
    console.log("getQuestions");
    await quizStore.getNextQuestion();
    console.log("getNextQuestion");
    history.push( "quiz" );
  }

  return (
   <Container flex>
     <h1 className="display-2">{ quiz.title }</h1>
     <Button color="primary" onClick={ () => startQuiz() }>Start this quiz</Button>
   </Container>
  )
}

export default withRouter( QuizPreview );
