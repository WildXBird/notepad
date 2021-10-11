import * as React from 'react';
import { getFontList } from "../function/getFontList"
import "./windows.less"

type WindowState = {

}
type WindowProps = {
  width?: number
  height?: number
}
export class Window extends React.PureComponent<WindowProps, WindowState> {
  WINDOW: React.RefObject<HTMLDivElement>
  WINDOW_title: React.RefObject<HTMLDivElement>
  moving: boolean
  mouseMovingTitleBarOffsetX: number
  mouseMovingTitleBarOffsetY: number
  constructor(props: WindowProps) {
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
        className={"WINDOWS-window"}
        style={{
          height: this.props.height || 400,
          width: this.props.width || 300,
        }}>
        <div ref={this.WINDOW_title} className={"WINDOWS-title"}>
          {"字体"}
        </div>
        <div className={"WINDOWS-content"}>
          {this.props.children}
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

export type SelectionData<T> = {
  value: T
  text: string
}
type SelectProps<T> = {
  data: SelectionData<T>[]
  defaultValue?: T
  renderStyle: (data: SelectionData<T>) => React.CSSProperties
  style?: React.CSSProperties
  onChange?: (data: SelectionData<T>) => void
}
type SelectState<T> = {
  selected?: T
}
export class Select<T> extends React.PureComponent<SelectProps<T>, SelectState<T>> {
  constructor(props: SelectProps<T>) {
    super(props);
    this.state = {

    }
  }


  componentDidMount() {
    if (this.props.defaultValue) {
      this.setState({ selected: this.props.defaultValue })
    }
  }

  render() {
    let render = (item: SelectionData<T>) => {
      const renderStyle = this.props.renderStyle(item) || {}

      return <div className={`${this.state.selected === item.value ? "WINDOWS-selection-selected" : ""} WINDOWS-selection`}
        style={{ ...renderStyle }}
        onClick={() => {
          this.setState({
            selected: item.value
          })
          if (this.props.onChange) {
            this.props.onChange(item)
          }
        }}
        key={typeof (item.value) === "string" ? String(item.value) : undefined}
      >
        {item.text}
      </div>
    }
console.log("this.props.data",this.props.data)
    return (

      <div className={"WINDOWS-select"} style={this.props.style} >
        {Array.from(this.props.data, render)}
      </div>
    )
  }



}


