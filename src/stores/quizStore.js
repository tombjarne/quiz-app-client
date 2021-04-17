import React from "react";

import { Api } from '../services/api';
import { makeObservable, observable } from 'mobx'

import { eTag } from "./caching/eTag";

import { AuthorSchema } from "../schemas";

/*
  TODO: add description
 */

class QuizStore extends React.Component{

  api = new Api();
  eTag = null;

  author = {};

  constructor( props ) {
    super( props );

    this.eTag = eTag;
    this.author = AuthorSchema;

    makeObservable( this, {
      author: observable,
      eTag: observable
    } )
  }

  // kicks off quiz
  start() {

  }

  getQuestions() {

  }

  submitAnswer() {

  }

  getResults() {

  }

}

export default QuizStore;
