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
  id?: number
  value: T
  text: string
}
type SelectProps<T> = {
  data: SelectionData<T>[]
  value?: T
  renderStyle?: (data: SelectionData<T>) => React.CSSProperties
  style?: React.CSSProperties
  onChange?: (data: SelectionData<T>) => void
}
type SelectState<T> = {
  // selected?: T
  needFocusSelected?: boolean
  didMounted?: boolean
}
export class Select<T> extends React.PureComponent<SelectProps<T>, SelectState<T>> {
  node: React.RefObject<HTMLDivElement>
  constructor(props: SelectProps<T>) {
    super(props);
    this.node = React.createRef();

    this.state = {

    }
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({ needFocusSelected: true, didMounted: true })
    }
    this.focusIfNeed()
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
    this.focusIfNeed()
  }
  render() {
    let hasSelected: boolean = false
    let render = (item: SelectionData<T>) => {
      let renderStyle = {}
      if (this.props.renderStyle) {
        renderStyle = this.props.renderStyle(item)
      }
      const selected = this.props.value === item.value
      if (selected) {
        hasSelected = true
      }
      return <div
        className={`${selected ? "WINDOWS-selection-selected" : ""} WINDOWS-selection`}
        style={{ ...renderStyle }}
        onClick={() => {
          if (this.props.onChange) { this.props.onChange(item) }
        }}
        key={(typeof (item.id) === "number" ? String(item.id) : undefined) ||
          (typeof (item.value) === "string" ? String(item.value) : undefined)}
      >
        {item.text}
      </div>
    }

    const children = Array.from(this.props.data, render)
    if (!hasSelected && this.state.didMounted) {
      this.selectedFirstItem()
    }
    return (
      <div className={"WINDOWS-select-outBorder"} >
        <div
          ref={this.node}
          className={"WINDOWS-select"} style={this.props.style} >
          {children}
        </div>
      </div>

    )
  }

  selectedFirstItem() {
    if (this.props.data.length > 0) {
      for (let item of this.props.data) {
        if (this.props.onChange) { this.props.onChange(item) }
        break
      }
    }
  }
  focusIfNeed() {
    if (this.state.needFocusSelected) {
      if (this.node.current) {
        const selected = this.node.current.getElementsByClassName("WINDOWS-selection-selected")
        for (let element of selected) {
          element.scrollIntoView()
          this.setState({
            needFocusSelected: false
          })
        }
      } else {
        console.error("无法滚动到被选中内容")
      }
    }
  }

}
type InputProps = {
  actived?: boolean
  clickToSelectAll?: boolean
  value?: string
  ref?: string
  // renderStyle?: (data: SelectionData<T>) => React.CSSProperties
  style?: React.CSSProperties
  onChange?: (newValue: string, event: React.ChangeEvent<HTMLInputElement>) => void
}
type InputState = {
}
export class Input extends React.PureComponent<InputProps, InputState> {
  inputNode: React.RefObject<HTMLInputElement>
  constructor(props: InputProps) {
    super(props);
    this.inputNode = React.createRef();

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    let classNames = ["WINDOWS-input"]
    if (this.props.actived) {
      classNames.push("WINDOWS-input-actived")
    }
    return (
      <div className={classNames.join(" ")}>
        <input
          ref={this.inputNode}
          value={this.props.value}
          onClick={() => {
            if (this.inputNode && this.inputNode.current) {
              if (this.props.clickToSelectAll) {
                this.inputNode.current.focus()
                this.inputNode.current.select()
              }
            }
          }}
          onChange={(event) => {
            if (this.props.onChange) {
              this.props.onChange(event.target.value, event)
            }
          }}
        />
      </div>
    )
  }

}
type ParagraphProps = {
}
export class Paragraph extends React.PureComponent<ParagraphProps, {}> {
  render() {
    return (
      <div className={"WINDOWS-paragraph"}>
        {this.props.children}
      </div>
    )
  }

}


