import React from 'react';
import './App.css';



class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <div
          ref={this.textInput}
          id="txt1"
          onClick={this.getTxt1CursorPosition}
          className="App-content"
          contenteditable="true"
          spellcheck="false" />
        <state className="App-state">

        </state>
      </div>
    );
  }
  getTxt1CursorPosition() {
    const contentTopDOM = this.textInput.current
    var sel = document.getSelection();
    console.log("contentTopDOM",contentTopDOM)
    console.log("sel", sel.anchorNode)
    console.log("sel", sel.anchorOffset)
    // alert(sel);

  }

}


export default App;
