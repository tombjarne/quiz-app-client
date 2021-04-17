import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import Question from "./questions";
import { QUIZ } from "../constants";

const Quiz = () => {

  const [quiz, setQuiz] = useState( QUIZ );
  const [pointer, setPointer] = useState( 0 );
  const [currentQuestion, setCurrentQuestion] = useState( QUIZ.questions[0] );
  const [questionIsActive, setQuestionActivity] = useState( true );

  const proceedQuiz = ( answerId ) => {

    // connect to store and proceed with api calls
    let next = pointer + 1;

    try {
      setPointer( next );
      setCurrentQuestion( quiz.questions[next] )
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
        <Question question={ currentQuestion } callback={ proceedQuiz }/>
       )
     }
   </section>
  )
}

export default withRouter( Quiz )
