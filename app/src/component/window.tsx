import * as React from 'react';
import { getFontList } from "../function/getFontList"
import "./window.sass"

type AppState = {

}
export class Window extends React.PureComponent<any, AppState> {
  WINDOW: React.RefObject<HTMLDivElement>
  WINDOW_title: React.RefObject<HTMLDivElement>
  moving: boolean
  mouseMovingTitleBarOffsetX: number
  mouseMovingTitleBarOffsetY: number
  constructor(props: {}) {
    super(props);
    this.WINDOW = React.createRef();
    this.WINDOW_title = React.createRef();
    this.moving = false
    this.mouseMovingTitleBarOffsetX = 0
    this.mouseMovingTitleBarOffsetY = 0

    this.state = {

    }
  }



  async componentDidMount() {
    const fontInstalled = await getFontList()
    console.log("fontInstalled", fontInstalled)
    if (this.WINDOW_title?.current) {
      this.WINDOW_title.current.addEventListener('mousedown', this.titleBarMousedown.bind(this));
      document.addEventListener('mouseup', this.mouseup.bind(this));
      document.addEventListener('mousemove', this.mousemove.bind(this));
    } else {
      console.error("WINDOW", "not readt")
    }
  }
  componentWillUnmount() {
    if (this.WINDOW_title?.current) {
      this.WINDOW_title.current.removeEventListener('mousedown', this.titleBarMousedown);
    }
    document.removeEventListener('mouseup', this.mouseup);
    document.removeEventListener('mousemove', this.mousemove);

  }
  render() {
    return (
      <div
        ref={this.WINDOW}
        style={{
          height: 200, width: 200, background: "#d9d9d9", userSelect: "none",
          position: "fixed",
          left: 0,
          top: 0,
          border:"1px #707070 solid",
          filter: "drop-shadow(0px 0px 8px #8b8b8b)"
        }}>
        <div
          ref={this.WINDOW_title}
          style={{
            background: "red"
          }}
        >
          title
        </div>
      </div>
    )
  }

  titleBarMousedown(event: MouseEvent) {
    console.log("titleBarMousedown")
    this.moving = true

    const left = event.offsetX
    const top = event.offsetY

    this.mouseMovingTitleBarOffsetX = left
    this.mouseMovingTitleBarOffsetY = top
  }
  mousemove(event: MouseEvent) {
    if (!this.moving) {
      return
    }

    const left = event.clientX - this.mouseMovingTitleBarOffsetX
    const top = event.clientY - this.mouseMovingTitleBarOffsetY
    if (this.WINDOW?.current) {
      this.WINDOW.current.style.transform = `translate(${left}px, ${top}px)`
    }
  }
  mouseup() {
    console.log("mouseup")

    this.moving = false


  }


}


