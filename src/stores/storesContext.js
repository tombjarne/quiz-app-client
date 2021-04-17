import React from "react";

import QuizStore from "./quizStore";

export const storesContext = React.createContext( {
  quizStore: new QuizStore(),
} )
