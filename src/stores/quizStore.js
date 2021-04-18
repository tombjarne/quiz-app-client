import React from "react";

import { Api } from '../services/api';
import { makeObservable, observable } from 'mobx'

import { AnswerSchema } from "../schemas/answerSchema";

class QuizStore extends React.Component{

  api = new Api();

  quiz = null
  quizId = null;

  currentQuestion = {};
  currentQuestionIndex = 0;
  currentQuestionResult = null;

  questionIds = [];

  // arrays containing corresponding ids
  correctAnswers = [];
  wrongAnswers = [];

  errorMessage = "";

  constructor( props ) {
    super( props );

    makeObservable( this, {
      quiz: observable,
      currentQuestion: observable,
      currentQuestionIndex: observable,
      currentQuestionResult: observable,
      correctAnswers: observable,
      wrongAnswers: observable,
      errorMessage: observable
    } )
  }

  setErrorMessage( message, isGeneric ) {
    this.errorMessage = !isGeneric
     ? message : "something went wrong, please try again.";
  }

  resetValuesToDefault() {
    this.currentQuestion = {};
    this.currentQuestionIndex = 0;
    this.currentQuestionResult = null;
    this.questionIds = [];
    this.correctAnswers = [];
    this.wrongAnswers = [];
    this.quiz = null;
    this.quizId = null;
  }

  // kicks off quiz
  async getRandomQuiz() {

    this.resetValuesToDefault();

    let response = {};

    try {
      response = await this.api.getRandomQuiz();

      if ( response ) {
        let res = JSON.parse( response );
        this.quiz = res;
        this.quizId = res.id;

      } else {
        this.setErrorMessage( "error" );
        return { success: false, ...response }
      }

    } catch ( error ) {
      this.setErrorMessage( null, true );
      return { success: false, error }
    }
    return JSON.parse( response );
  }

  async getQuestions() {
    try {

      const response = await this.api.getQuestionsById( this.quizId );

      if ( response ) {
        this.questionIds = JSON.parse( response.questions );
        this.currentQuestionIndex = 0;

      } else {
        this.setErrorMessage( response.message );
        return { success: false, ...response }
      }

    } catch ( error ) {
      this.setErrorMessage( null, true );
      return { success: false, error }
    }
  }

  async getNextQuestion() {

    let response = {};

    try {
      if ( this.currentQuestionIndex === this.questionIds.length ) {
        return false; // indicates end of quiz
      }

      this.currentQuestionResult = null;

      console.log( this.questionIds );
      console.log( this.questionIds[0] );
      response = await this.api.getQuestionById( this.quizId, this.questionIds[0] );
      this.currentQuestionIndex += 1;

      if ( response ) {
        this.currentQuestion = response.question;
        this.currentQuestionIndex += 1;

      } else {
        this.setErrorMessage( response.message );
        return { success: false, ...response }
      }

    } catch ( error ) {
      this.setErrorMessage( null, true );
      return { success: false, error }
    }
    return response;
  }

  assembleResponsePayload( answerId, solution ) {
    let payload = AnswerSchema;
    let type = this.currentQuestion.type;

    payload.type = type;

    if ( solution != null && type === 2 ) {
      payload.solution = solution;
    } else {
      payload.answerId = answerId;
    }

    return payload;
  }

  async submitAnswer( quizId, questionId, answerId, solution ) {

    let response = {};

    try {

      let payload = this.assembleResponsePayload( answerId, solution );

      response = await this.api.submitAnswerForId( quizId, questionId, payload );

      if ( response ) {

        if ( response.value ) {
          this.correctAnswers.push( questionId );
          return true;

        } else {
          this.wrongAnswers.push( questionId );
          return false;
        }

      } else {
        this.setErrorMessage( response.message );
        return { success: false, ...response }
      }

    } catch ( error ) {
      this.setErrorMessage( null, true );
      return { success: false, error }
    }
    return response;
  }

  async submitAnswers( quizId, questionId, answerIds, solution ) {

    let response = {};

    try {

      let payload = this.assembleResponsePayload( answerIds );

      response = await this.api.submitAnswerForId( quizId, questionId, payload );

      if ( response ) {

        if ( response.value ) {
          this.correctAnswers.push( questionId );
          return true;

        } else {
          this.wrongAnswers.push( questionId );
          return false;
        }

      } else {
        this.setErrorMessage( response.message );
        return { success: false, ...response }
      }

    } catch ( error ) {
      this.setErrorMessage( null, true );
      return { success: false, error }
    }
    return response;
  }

  getResults() {
    return this.correctAnswers.length / this.wrongAnswers.length; // completion percentage
  }

}

export default QuizStore;
