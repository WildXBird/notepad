import * as React from 'react';
import './App.css';
import { getFontList } from "./function/getFontList"
import { diffChars } from "diff"


type AppState = {
  posY: number
  posX: number
}
class App extends React.PureComponent<any, AppState> {
  textInput: React.RefObject<HTMLElement>
  constructor(props: {}) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      posY: 1,
      posX: 1
    }
  }


  componentDidMount() {
    getFontList()

  }
  render() {
    return (
      <div className="App">
        <section
          ref={this.textInput}
          id="txt1"
          // onClick={this.freshCursorPosition.bind(this)}
          // onInput={this.onInput.bind(this)}
          onBeforeInput={this.onBeforeInput.bind(this)}
          onPaste={this.onBeforeInput.bind(this)}
          className="App-content"
          contentEditable="true"
          spellCheck="false"
        />
        <footer className="App-state">
          {/* X:{this.state.posX} */}
          {/* y:{this.state.posY} */}

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

        </footer>
      </div>
    );
  }
  onInput(event?: any) {
    this.freshCursorPosition()
  }
  onBeforeInput(event?: any) {
    
    event?.preventDefault()

    console.log("onBeforeInput", event)
    console.log("onBeforeInput2", event.nativeEvent.srcElement.innerHTML)
    return
  }
  contentFilter() {
    const contentTopDOM = this.textInput.current
    if (!contentTopDOM) {
      return
    }
    const resetAttribute = function (node: HTMLElement) {

      if (typeof (node.getAttribute) === "function") {
        const attributes = [...node.attributes]
        for (let attribute of attributes) {
          node.removeAttribute(attribute.name)
        }
        let remo = ["class", "onclick", "id", "style"]
        for (let item of remo) {
          node.removeAttribute(item)
        }
      }
    }


    function escapeHtml(html: string) {
      var text = document.createTextNode(html);
      var p = document.createElement('p');
      p.appendChild(text);
      return p.innerHTML;
    }

    for (let childNode of contentTopDOM.childNodes) {
      const line: HTMLElement = childNode as any as HTMLElement
      console.log("line", line)
      if (line.nodeType === 1) {
        if (line.innerText !== line.innerHTML) {
          // line.innerHTML = (line.innerText)
          var p = document.createElement('textarea');
          p.innerHTML = line.innerHTML
          console.log("p", p)




          // let text1 = (String(line.textContent))
          // text1 = encodeURIComponent(String(line.textContent))
          // let text2 = (line.innerText)
          // text2 = encodeURIComponent(line.innerText)

          // // @ts-ignore
          // const diff = diffChars(text1,text2)
          // // const diff = diffChars("text1", "text2")
          // if (diff.length > 1) {
          //   console.warn("diff", diff)
          // }





          // line.innerHTML = (line.innerText)
          // line.innerHTML = (line.innerText.replaceAll('\n', "<br>"))
          // line.innerHTML = escapeHtml(line.innerText.replaceAll('\n', "<br>"))

        }

        resetAttribute(line)

        // // @ts-ignore
        // if (line.tagName !== "DIV") {
        //   // @ts-ignore
        //   line.remove()
        // }
      } else {
        console.log("skip", line)
      }

    }


    return
    // let walker = document.createTreeWalker(contentTopDOM);
    // var node = walker.nextNode();

    // while (node !== null) {
    //   if (node) {
    //     console.log("node", node)
    //     // @ts-ignore
    //     if (typeof (node.getAttribute) === "function") {
    //       // @ts-ignore
    //       if (node.getAttribute("style") !== null) {
    //         // @ts-ignore
    //         node.setAttribute("style", null)
    //       }
    //     }

    //   }

    // }
    // node = walker.nextNode();
    // }

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
