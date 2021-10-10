import * as React from 'react';
import './App.css';
import { getFontList } from "./function/getFontList"
import { diffChars } from "diff"
import { type } from 'os';
import { setInterval } from 'timers';

const GUID = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

type AppState = {
  posY: number
  posX: number
  lines: {
    elements: {
      text: string,
      id: string
      type: "text"
    }[],
    lid: string
  }[]
}
class App extends React.PureComponent<any, AppState> {
  textInput: React.RefObject<HTMLElement>
  constructor(props: {}) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      posY: 1,
      posX: 1,
      lines: []
    }
  }


  componentDidMount() {
    getFontList()


  }
  renderTextArea() {
    if (this.textInput.current) {
      console.error("textInput is not Ready")
      return
    }
    console.log("lines", this.state.lines)
    const newArea = Array.from(this.state.lines, (item, id) => {
      for (let element of item.elements) {
        // element.id
        // element.text
      }
      return `<div>${item}</div>`
    })
    if (this.textInput.current) {
      // this.textInput.current.innerHTML = newArea.join("")
    }

  }
  render() {
    console.log("lines", this.state.lines)
    setTimeout(() => {
      this.renderTextArea()
    }, 0);
    return (
      <div className="App">
        <div id="temp" style={{ height: 0, overflow: "hidden", background: "red", width: "100%" }} />
        <section
          ref={this.textInput}
          id="txt1"
          onClick={this.freshCursorPosition.bind(this)}
          onInput={this.freshCursorPosition.bind(this)}
          onBeforeInput={(event) => { console.log("onBeforeInput", event) }}
          onPaste={(event) => { this.onBeforeInput(event.clipboardData, event) }}
          // onDrop={(event) => { this.onBeforeInput(event.dataTransfer, event) }}
          onDrop={(event) => { event.preventDefault() }}
          className="App-content"
          contentEditable="true"
          spellCheck="false"
        />
        <footer className="App-state">
          <div style={{ width: 250 }}>
            {`第 ${this.state.posY} 行，第 ${this.state.posX} 列`}
          </div>
          <div style={{ width: 100 }}>
            {"100%"}
          </div>
          <div style={{ width: 100 }}>
            {"Windows (CRLF)"}
          </div>
          <div style={{ width: 100 }}>
            {"UTF-8"}
          </div>
          <div style={{ width: 100 }}>
            <div style={{
              backgroundImage: `url(${"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0xMC0xMFQxMjoyOToyNyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMC0xMFQxMjoyOToyNyswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMTAtMTBUMTI6Mjk6MjcrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YTU3ZDRmZjAtOGU5OC00YzRiLWFlMDctZmVlYTQ2OGQ3MWU3IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjY4Nzc1ZDItODU2OC00ZDRjLTkxZmQtMzBmOWU1MzU2YTAzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTJmOTE4Y2MtNGI2NS0wYTRiLThkY2EtNzk3ODQ1N2E4Y2VhIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTJmOTE4Y2MtNGI2NS0wYTRiLThkY2EtNzk3ODQ1N2E4Y2VhIiBzdEV2dDp3aGVuPSIyMDIxLTEwLTEwVDEyOjI5OjI3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphNTdkNGZmMC04ZTk4LTRjNGItYWUwNy1mZWVhNDY4ZDcxZTciIHN0RXZ0OndoZW49IjIwMjEtMTAtMTBUMTI6Mjk6MjcrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+o3rxlwAAACpJREFUGBlj+P//PwM2vH///v8gzEC2AhjGqgunCQQVYLUCmy4UEwgpAAAHz8Up3ORBVQAAAABJRU5ErkJggg=="})`,
              backgroundPosition: "right bottom",
              height: "calc(100% - 2px)",
              backgroundRepeat: "no-repeat",
              marginRight: 2
            }} />
          </div>
        </footer>
      </div>
    );
  }
  // onInput(event: React.FormEvent<HTMLElement>) {
  //   // this.contentFilter()
  //   this.freshCursorPosition()
  // }
  onBeforeInput(DataTransfer: DataTransfer, event: React.FormEvent<HTMLElement>) {
    console.log("onBeforeInputCLASS.selection", getSelection())
    console.log("onBeforeInputCLASS", event)
    // if (this.state.posY !== 1) {
    event.preventDefault()
    // }

    // const pldata2: string = DataTransfer.getData("text/plain")
    // console.log("pldata2", pldata2)
    const pldata: string = DataTransfer.getData('text/html')
    console.log("pldata",)
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(pldata, "text/html")
    console.log("body", doc)
    const newTexts = this.newContentParser(doc.body.innerHTML)
    console.log("newTexts", newTexts)

    let newLines: AppState["lines"] = []
    for (let text of newTexts) {
      newLines.push({
        elements: [{
          text: text,
          id: GUID(),
          type: "text"
        }],
        lid: GUID()
      })
    }


    this.setState({
      lines: newLines
    })

  }
  newContentParser(html: string): string[] {
    function escapeHtmlText(html: string) {
      var text = document.createTextNode(html);
      var p = document.createElement('p');
      p.appendChild(text);
      return p.innerHTML;
    }
    function childNodeTextsEscape(html: string): string {
      const paragraph = document.createElement('aside');
      paragraph.innerHTML = html
      const walker = document.createTreeWalker(paragraph);

      let node = walker.nextNode();
      while (node !== null) {
        if (node.nodeType === 3) {
          // @ts-ignore
          if (typeof (node.data) === "string") {
            // @ts-ignore
            let nodeData: string = node.data
            nodeData = escapeHtmlText(nodeData)
            nodeData = nodeData.replaceAll("\\n", "&wrap;")
            nodeData = nodeData.replaceAll(" ", "&nbsp;")
            nodeData = nodeData.replaceAll("  ", "&nbsp;&nbsp;")
            // @ts-ignore
            node.data = nodeData
          }

        }
        node = walker.nextNode();
      }
      console.log("paragraph", paragraph)
      return paragraph.innerHTML;
    }
    function childNodeTextsSymbolRecover(html: string): string {
      const paragraph = document.createElement('aside');
      paragraph.innerHTML = html
      const walker = document.createTreeWalker(paragraph);

      let node = walker.nextNode();
      while (node !== null) {
        if (node.nodeType === 3) {
          // @ts-ignore
          if (typeof (node.data) === "string") {
            // @ts-ignore
            let nodeData: string = node.data
            nodeData = nodeData.replaceAll('&wrap;', "\\n")
            // @ts-ignore
            node.data = nodeData
          }
        }
        node = walker.nextNode();
      }
      console.log("paragraph", paragraph)
      return paragraph.innerHTML;
    }
    function htmlAddBRs(html: string): string {
      html = html.replaceAll("\n", "<br>")
      return html
    }
    const newLines = []


    // var paragraph = document.createElement('aside');
    var paragraph = document.getElementById("temp")
    if (!paragraph) {
      return []
    }
    paragraph.innerHTML = (html)
    // console.log("p2", "paragraph", paragraph)
    paragraph.innerHTML = childNodeTextsEscape(html)

    newLines.push(...paragraph.innerText.split("\n"))

    // paragraph.innerHTML = htmlAddBRs(paragraph.innerText)
    // paragraph.innerHTML = childNodeTextsSymbolRecover(paragraph.innerHTML)
    // console.log("p3", "childNodeTextsSymbolRecover", paragraph.innerHTML)
    // console.log("p4", "paragraph", paragraph)
    return newLines
  }
  freshCursorPosition() {
    const newPos = this.getCurrentCursorPosition()
    this.setState({
      posX: newPos.x,
      posY: newPos.y,
    })
  }
  getCurrentCursorPosition(): { x: number, y: number } {
    console.log("getCurrentursorPosition")
    let X = 1
    let Y = 1
    if (this.textInput) {
      const contentTopDOM = this.textInput.current
      if (contentTopDOM) {
        const sel = document.getSelection();
        if (sel) {
          const anchorNode: any = sel.anchorNode
          const offset = sel.anchorOffset + 1
          X = offset
          if (contentTopDOM === anchorNode) {
            Y = 1
          } else {

            [...contentTopDOM.childNodes].some((childNode, nodeId) => {
              const compare = childNode.compareDocumentPosition(anchorNode)
              if (compare === 0 || compare >= 16) {
                Y = nodeId + 1
                return true
              }
            })
          }
        }
      }
    }
    return {
      x: X, y: Y
    }
  }
}


export default App;
