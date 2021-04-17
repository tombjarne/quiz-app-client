import React from "react";

import Logo from '../assets/img/logo192.png';

export const VERSION = "0.1.3.2";
export const LASTUPDATE = "18.03.2021";

export const APPLICATIONLOGO = () => {
  return (
   <img id="application-logo" src={ Logo } alt={ "quiz-app" }/>
  );
}

export const QUIZ = {
  "name": "Capitals of Europe",
  "questions": [
    {
      "title": "What is the capital of the Netherlands?",
      "type": "classic",
      "answers": [
        {
          "id": "123",
          "value": "Copenhagen"
        },
        {
          "id": "124",
          "value": "Aarhus"
        },
        {
          "id": "125",
          "value": "Rotterdam"
        },
        {
          "id": "126",
          "value": "Amsterdam"
        }
      ]
    },
    {
      "title": "Is Warshaw the capital of Poland?",
      "type": "true-false"
    }
  ]
}

export const PAGES = [
  {
    "id": 1,
    "name": "Start",
    "url": "/start"
  },
  {
    "id": 2,
    "name": "Quiz",
    "url": "/quiz"
  }
];
