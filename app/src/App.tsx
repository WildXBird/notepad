import * as React from 'react';
import './App.css';
import { getFontList } from "./function/getFontList"
import { md5 } from "./function/hash"
import { diffChars } from "diff"
import { type } from 'os';
import { setInterval } from 'timers';
import { createInvisibleDOM, removeDOM } from "./function/createInvisibleDOM"
import {FontSelection} from "./component/fontSelection"

const GUID = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

type AppState = {
  posY: number
  posX: number
  lastContentHTML: string
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
  textInput: React.RefObject<HTMLDivElement> | undefined
  textInputsim: React.RefObject<HTMLDivElement> | undefined
  fontTemp: React.RefObject<HTMLDivElement> | undefined
  constructor(props: {}) {
    super(props);
    this.textInput = React.createRef();
    this.textInputsim = React.createRef();
    this.fontTemp = React.createRef();
    this.state = {
      posY: 1,
      posX: 1,
      lastContentHTML: "",
      lines: []
    }
  }


  async componentDidMount() {
    // if (!this.fontTemp || !this.fontTemp.current) {
    //   return
    // }
    // const fontInstalled = await getFontList()
    // console.log("fontInstalled", fontInstalled)

  }

  render() {
    return (
      <div className="App">
        <div id="tempTop" style={{
          // height: 0,
          overflow: "hidden", background: "red", width: "100%"
        }} >
          <div id="temp" />
          <div id="fontTemp" ref={this.fontTemp} />
        </div>
        <FontSelection />
        <section
          ref={this.textInput}
          onClick={this.freshCursorPosition.bind(this)}
          onKeyDown={this.freshCursorPosition.bind(this)}
          onInput={this.afterInput.bind(this)}
          className="App-content"
          contentEditable="true"
          spellCheck="false"
        />

        <section
          ref={this.textInputsim}
          onClick={this.freshCursorPosition.bind(this)}
          onKeyDown={this.freshCursorPosition.bind(this)}
          onInput={this.afterInput.bind(this)}
          className="App-sim"
          contentEditable="true"
          spellCheck="false"
        />
        <footer className="App-state">
          <div style={{ width: 250 }} onClick={() => {

          }}>
            {"点击 "}
          </div>
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
  afterInput(event: React.FormEvent<HTMLElement>) {
    this.contentFilter()
    // setTimeout(this.contentFilter, 0);
    this.freshCursorPosition()
  }
  contentFilter() {
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
    function elementRemoveBR(thisElement: HTMLElement): void {
      const walker = document.createTreeWalker(thisElement);
      let node = walker.nextNode();
      const removeList: Node[] = []

      while (node !== null) {
        if (Node.ELEMENT_NODE !== node.nodeType) {
          const thisNode: HTMLElement = node as unknown as HTMLElement
          if (thisNode.tagName === "BR") {
            removeList.push(thisNode)
          }
        }
        node = walker.nextNode();
      }

      for (let dom of removeList) {
        dom.parentNode?.removeChild(dom)
      }
    }
    function isNodeNeed2BeUpdate(thisElement: HTMLElement): boolean {
      const thisMD5 = thisElement.getAttribute("inner_html_md5") || ""
      const newMD5 = md5(thisElement.innerHTML)
      if (thisMD5 === newMD5) {
        return false
      }
      thisElement.setAttribute("inner_html_md5", newMD5)

      if (thisElement.nodeName !== "DIV") {
        return true
      }

      const textEscaped = escapeHtmlText(thisElement.innerText)
      const innerHTML = thisElement.innerHTML
      if (textEscaped === innerHTML) {
        return false
      }
      //检查子节点
      const childNodes = thisElement.childNodes
      elementRemoveBR(thisElement)
      for (let node of childNodes) {
        if (Node.TEXT_NODE === node.nodeType) {
          //文字节点略过，看看其他的node
        } else if (Node.ELEMENT_NODE !== node.nodeType) {
          console.log("treu", 1, node.nodeType)
          return true
        } else if (node.nodeName === "SPAN") {
          const childSpanElement: HTMLElement = node as unknown as HTMLElement
          const childSpanElementTextEscaped = escapeHtmlText(childSpanElement.innerText)
          const childSpanElementInnerHTML = childSpanElement.innerHTML
          if (childSpanElementTextEscaped !== childSpanElementInnerHTML) {
            console.log("treu", 2)
            return true

          }
        } else if (node.nodeName === "BR") {

        } else {
          console.log("treu", 3, node.nodeName)

          return true

        }
      }

      return false
    }

    if (!this.textInput || !this.textInput.current) {
      console.error('textInput not ready')
      return
    }
    if (!this.textInputsim || !this.textInputsim.current) {
      console.error('textInputsim not ready')
      return
    }
    const selection = getSelection()
    const textInputDom = this.textInput.current
    const textInputsimDom = this.textInputsim.current
    const childNodes = textInputDom.childNodes
    const removeList: Node[] = []
    const addLinesList: {
      before: Node,
      text: string
    }[] = []

    textInputsimDom.innerHTML = textInputDom.innerHTML



    if (this.state.lastContentHTML.length === 0) {
      textInputDom.innerHTML = `<div>${textInputDom.innerHTML}</div>`
    }

    this.setState({
      lastContentHTML: textInputDom.innerHTML
    })
    const stage = document.createElement('div');

    for (let node of childNodes) {
      if (Node.TEXT_NODE === node.nodeType) {
        removeList.push(node)
        addLinesList.push({
          before: node,
          text: node.textContent || ""
        })
      } else if (Node.ELEMENT_NODE !== node.nodeType) {
        removeList.push(node)
      } else {
        const thisElement: HTMLElement = node as unknown as HTMLElement
        switch (thisElement.tagName) {
          case "BR":
            removeList.push(thisElement)
            break;
          case "SPAN":
          case "B":

            break;

          default:
            if (isNodeNeed2BeUpdate(thisElement)) {
              removeList.push(node)
              console.log("isNodeNeed2BeUpdate", true, thisElement)
              const tempDom = createInvisibleDOM()
              tempDom.innerHTML = childNodeTextsEscape(thisElement.innerHTML)
              const newLines = []
              console.log("tempDom.innerHTML", tempDom.innerHTML,)
              console.log("tempDom.innerText", tempDom.innerText, tempDom.innerText.split("\n"))
              newLines.push(...tempDom.innerText.split("\n"))
              console.log("newLines", newLines)
              for (let text of newLines) {
                addLinesList.push({
                  before: thisElement,
                  text: childNodeTextsSymbolRecover(text)
                })
              }
              removeDOM(tempDom)
            }
            break;
        }
        // if (thisElement.tagName === "BR") {
        //   removeList.push(thisElement)
        // } else if (thisElement.tagName === "SPAN") {
        //   removeList.push(thisElement)
        // } else if (isNodeNeed2BeUpdate(thisElement)) {
        //   removeList.push(node)
        //   console.log("isNodeNeed2BeUpdate", true, thisElement)
        //   const tempDom = createInvisibleDOM()
        //   tempDom.innerHTML = childNodeTextsEscape(thisElement.innerHTML)
        //   const newLines = []
        //   console.log("tempDom.innerHTML", tempDom.innerHTML,)
        //   console.log("tempDom.innerText", tempDom.innerText, tempDom.innerText.split("\n"))
        //   newLines.push(...tempDom.innerText.split("\n"))
        //   console.log("newLines", newLines)
        //   for (let text of newLines) {
        //     addLinesList.push({
        //       before: thisElement,
        //       text: childNodeTextsSymbolRecover(text)
        //     })
        //   }
        //   removeDOM(tempDom)
        // } else {
        //   // console.log("NOT", "isNodeNeed2BeUpdate", thisElement)
        // }

      }
    }
    // return

    //！先insert后remove
    for (let line of addLinesList) {
      var paragraph = document.createElement('div');
      paragraph.innerHTML = line.text
      textInputDom.insertBefore(paragraph, line.before);
    }
    for (let dom of removeList) {
      dom.parentNode?.removeChild(dom)
    }

  }
  freshCursorPosition() {
    const newPos = this.getCurrentCursorPosition()
    this.setState({
      posX: newPos.x,
      posY: newPos.y,
    })
    setTimeout(() => {
      const newPos = this.getCurrentCursorPosition()
      this.setState({
        posX: newPos.x,
        posY: newPos.y,
      })
    }, 100);
  }
  getCurrentCursorPosition(): { x: number, y: number } {
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
