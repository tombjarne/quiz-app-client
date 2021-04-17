import React from "react";
import { withRouter } from 'react-router-dom';

import { Jumbotron, Container, Button } from 'reactstrap';

class Start extends React.Component{

  startQuiz() {
    let view = "quiz";
    const { history } = this.props;
    view && history.push( view );
  }

  render() {
    return (
     <section>
       <Jumbotron flex>
         <Container flex>
           <h1 className="display-3">Quiz</h1>
           <p className="lead">Start quizzing today!</p>
           <Button color="primary" onClick={ () => this.startQuiz() }>Begin</Button>
         </Container>
       </Jumbotron>
     </section>
    )
  }
}

export default withRouter( Start )
