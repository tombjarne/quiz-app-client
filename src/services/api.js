const apiServer = "https://localhost:5001/api"

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export class Api{

  _invoke = async ( method, operation, payload ) => {
    const endpoint = `${ apiServer }/${ operation }`
    const headers = { ...DEFAULT_HEADERS }
    headers['mode'] = 'cors';

    const options = { method, headers }

    console.log( endpoint );

    if ( payload ) {
      options.body = JSON.stringify( payload )
    }

    const response = await fetch( endpoint, options )
    return response.json();
  }

  /* METHODS */

  _get = async ( operation ) => {
    return await this._invoke( 'GET', operation, null )
  }

  _post = async ( operation, payload ) => {
    return await this._invoke( 'POST', operation, payload )
  }

  /* ENDPOINTS */

  getRandomQuiz = async () => {
    return await this._get( 'quiz' );
  }

  getQuizById = async ( quizId ) => {
    return await this._get( `quiz/${quizId}` )
  }

  getQuestionsById = async ( quizId ) => {
    return await this._get(  `quiz/${quizId}/questions` )
  }

  getQuestionById = async ( quizId, questionId ) => {
    return await this._get( `quiz/${quizId}/questions/${questionId}` )
  }

  submitAnswerForId = async ( quizId, questionId, payload ) => {
    return await this._post( `quiz/${quizId}/questions/${questionId}/submit`, payload )
  }

  getAnswersForId = async ( quizId, questionId ) => {
    return await this._get( `quiz/${quizId}/questions/${questionId}/answers` )
  }

  GetAnswerById = async ( quizId, questionId, answerId ) => {
    return await this._get( `quiz/${quizId}/questions/${questionId}/answers/${answerId}` )
  }

}
