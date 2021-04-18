import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import Question from "./questions";
import QuestionResult from "./questions/result";

import { useStores } from "../stores/useStores";

const Quiz = () => {

  const { quizStore } = useStores();

  const [quiz, setQuiz] = useState( quizStore.quiz );
  const [answerValue, setAnswerValue] = useState( false );
  const [currentQuestion, setCurrentQuestion] = useState( quizStore.currentQuestion );
  const [questionIsActive, setQuestionActivity] = useState( true );

  const proceedQuiz = ( answerIds, solution ) => {

    let result;

    if ( currentQuestion.type === 1 ) {
      result = quizStore.submitAnswers( quiz.id, quizStore.currentQuestion.id, answerIds, solution );
    } else {
      result = quizStore.submitAnswer( quiz.id, quizStore.currentQuestion.id, answerIds[0], solution );
    }

    setAnswerValue( result );

    // handle quiz response -> true or false

    try {
      setQuestionActivity( false );
    } catch ( exception ) {
      // handle index out of bounds error when quiz is finished
      console.log( "end" );
    }
  }

  const startQuiz = () => {
    // contact store and call api
  }

  return (
   <section className="flex column all-centered">
     <div className="quiz-header flex all-centered">
       <h1 className="extra-big-text">Quiz:</h1>
       <h2 color="warning">{ quiz.name }</h2>
     </div>
     {
       questionIsActive &&
       (
        <Question question={ quizStore.currentQuestion } callback={ proceedQuiz }/>
       )
     }
     {
       !questionIsActive &&
       (
        <QuestionResult value={ answerValue }/>
       )
     }
   </section>
  )
}

export default withRouter( Quiz )
