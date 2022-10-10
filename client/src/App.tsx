import React from 'react';
import LeftColumn from "./components/leftColumn/leftColumn"
import RightColumn from "./components/rightColumn/rightColumn"
import "./styles/app.css"


function App() {
  return (
    <div className="column-holder">
      <LeftColumn></LeftColumn>
      <RightColumn></RightColumn>
    </div>
  );
}

export default App;
