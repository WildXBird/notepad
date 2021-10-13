import * as React from 'react';
import { GUID } from "../../function/guid"

import "./windows.less"
export * from "./Button"

export let WindowContext = React.createContext<WindowContextProps>({
  focus: '_unset',
  setFocus: (next: string) => { },
});
WindowContext.displayName = 'MyDisplayName'
export type WindowContextProps = {
  focus: string
  setFocus: (next: string) => void,
}

type WindowState = {
  windowFocus: string
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
      windowFocus: "_unset"
    }
  }

  async componentDidMount() {
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
      <WindowContext.Provider value={{
        focus: this.state.windowFocus,
        setFocus: (next: string) => { this.setState({ windowFocus: next }) }
      }}>
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
      </WindowContext.Provider>
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
    if (this.moving) {
      console.log("mouseup")
      this.moving = false
    }
  }
}
class WindowComponent<P, S> extends React.PureComponent<P, S> {
  protected COMPONENT_ID: string
  static contextType = WindowContext;
  private WINDOW_STATE: WindowContextProps;

  protected COMPONENT: {
    getFocused: () => boolean | undefined
  };

  constructor(props: P) {
    super(props);
    this.COMPONENT_ID = GUID()
    this.WINDOW_STATE = this.context
    const tryContent = () => {
      return typeof (this.context) === "object"
    }
    this.COMPONENT = {
      getFocused: () => {
        console.log("COMPONENT_STATE",tryContent(),this.WINDOW_STATE,this.context)
        if (tryContent()) {
          const WINDOW_STATE =  this.context
          return WINDOW_STATE.focus === this.COMPONENT_ID
        }
      }
    }
    console.log("WINDOW_STATE", this.WINDOW_STATE, this.context, this)
  }
}

export type SelectionData<T> = {
  data?: T
  key: string
  text: string
}
type SelectProps<T> = {
  data: SelectionData<T>[]
  activedKey?: number | string
  renderStyle?: (data: SelectionData<T>) => React.CSSProperties
  style?: React.CSSProperties
  onChange?: (data: SelectionData<T>) => void
}
type SelectState = {
  needFocusSelected?: boolean
  didMounted?: boolean
}
export class Select<T> extends React.PureComponent<SelectProps<T>, SelectState> {
  node: React.RefObject<HTMLDivElement>
  constructor(props: SelectProps<T>) {
    super(props);
    this.node = React.createRef();
    this.state = {}
  }

  componentDidMount() {
    if (this.props.activedKey) {
      this.setState({ needFocusSelected: true, didMounted: true })
    }
    this.scrollIntoViewIfNeed()
  }
  componentDidUpdate() {
    this.scrollIntoViewIfNeed()
  }
  render() {
    let hasSelected: boolean = false
    let render = (item: SelectionData<T>) => {
      let renderStyle = {}
      if (this.props.renderStyle) {
        renderStyle = this.props.renderStyle(item)
      }
      const selected = this.props.activedKey === item.key
      if (selected) {
        hasSelected = true
      }
      return <div
        className={`${selected ? "WINDOWS-selection-selected" : ""} WINDOWS-selection`}
        style={{ ...renderStyle }}
        onClick={() => {
          if (this.props.onChange) { this.props.onChange(item) }
          setTimeout(() => this.scrollIntoViewIfNeed(true), 0);
        }}
        key={(item.key ? String(item.key) : undefined)}
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
  scrollIntoViewIfNeed(force = false) {
    if (this.state.needFocusSelected || force) {
      if (this.node.current) {
        const selected = this.node.current.getElementsByClassName("WINDOWS-selection-selected")
        for (let element of selected) {
          element.scrollIntoView({ block: "nearest" })
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
type DropdownSelectState = {
  needFocusSelected?: boolean
  didMounted?: boolean
  showDropdown: boolean
  hoveredSelectionkey?: string
}
export class DropdownSelect<T> extends React.PureComponent<SelectProps<T>, DropdownSelectState> {
  node: React.RefObject<HTMLDivElement>
  constructor(props: SelectProps<T>) {
    super(props);
    this.node = React.createRef();
    this.state = {
      showDropdown: true
    }
  }

  componentDidMount() {
    if (this.props.activedKey) {
      this.setState({ needFocusSelected: true, didMounted: true })
    }
    this.scrollIntoViewIfNeed()
    document.addEventListener('mousedown', this.mousedown.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.mousedown);

  }

  componentDidUpdate() {
    this.scrollIntoViewIfNeed()
  }

  render() {
    let hasSelected: boolean = false
    let currentSelectedText = ""
    let renderFunc = (item: SelectionData<T>) => {
      let renderStyle = {}
      if (this.props.renderStyle) {
        renderStyle = this.props.renderStyle(item)
      }
      let selected = this.props.activedKey === item.key
      if (selected) {
        currentSelectedText = item.text
      }
      if (this.state.hoveredSelectionkey) {
        selected = this.state.hoveredSelectionkey === item.key
      }
      if (selected) {
        hasSelected = true
      }
      return <div
        className={`${selected ? "WINDOWS-dropdownSelect-selection-selected" : ""} WINDOWS-dropdownSelect-selection`}
        style={{ ...renderStyle }}
        onClick={() => {
          if (this.props.onChange) { this.props.onChange(item) }
          setTimeout(() => this.scrollIntoViewIfNeed(true), 0);
          this.hideDropdown()
        }}
        onMouseEnter={() => { this.setState({ hoveredSelectionkey: item.key }) }}
        key={(item.key ? String(item.key) : undefined)}
      >
        {item.text}
      </div>
    }
    const childrenCount = this.props.data.length
    const children = Array.from(this.props.data, renderFunc)
    if (!hasSelected && this.state.didMounted) {
      this.selectedFirstItem()
    }
    const selectionsHeight = this.state.showDropdown ? (childrenCount * 17) : (0)
    const selectionsBorderColor = this.state.showDropdown ? undefined : ("#0078d700")
    const selectionsBorderWidth = this.state.showDropdown ? undefined : (0)
    const selectionsBackgroundColor = this.state.showDropdown ? undefined : ("#ffffff00")
    const selectionsBackgroundTransitionDuration = this.state.showDropdown ? "0.1s" : undefined
    const selectionsShadowHeight = this.state.showDropdown ? Math.max((childrenCount * 17 - 5), 0) : (0)
    const selectionsShadowTransitionDuration = selectionsBackgroundTransitionDuration

    return (
      <div
        ref={this.node}
        className={`WINDOWS-dropdownSelect ${this.state.showDropdown ? "WINDOWS-dropdownSelect-showDropdown" : ""}`}
      //  onClick={() => {
      //   this.setState({ showDropdown: !this.state.showDropdown, hoveredSelectionkey: "" })
      // }}
      >
        <div className={"WINDOWS-dropdownSelect-box"}
          onClick={() => { this.setState({ showDropdown: !this.state.showDropdown, hoveredSelectionkey: "" }) }}
        >
          {/* //需要修复 */}
          <div className={`WINDOWS-dropdownSelect-currentSelected ${this.state.showDropdown ? "WINDOWS-dropdownSelect-currentSelected-active" : ""}`} >
            {currentSelectedText}
            {/* {String(this.state.showDropdown)} */}
          </div>
          <div className={"WINDOWS-dropdownSelect-arrow"} />
          <input className={"WINDOWS-dropdownSelect-fakeInput"} />
        </div>
        <div className={"WINDOWS-dropdownSelect-selections-limiter"}>
          <div className={"WINDOWS-dropdownSelect-selections"}
            style={{
              maxHeight: selectionsHeight, borderColor: selectionsBorderColor,
              borderWidth: selectionsBorderWidth,
              backgroundColor: selectionsBackgroundColor,
              transitionDuration: selectionsBackgroundTransitionDuration
            }}>
            <div className={"WINDOWS-dropdownSelect-selections-shadow"}
              style={{ height: selectionsShadowHeight, transitionDuration: selectionsShadowTransitionDuration }} />
            {children}
          </div>
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
  scrollIntoViewIfNeed(force = false) {
    if (this.state.needFocusSelected || force) {
      if (this.node.current) {
        const selected = this.node.current.getElementsByClassName("WINDOWS-selection-selected")
        for (let element of selected) {
          element.scrollIntoView({ block: "nearest" })
          this.setState({
            needFocusSelected: false
          })
        }
      } else {
        console.error("无法滚动到被选中内容")
      }
    }
  }
  hideDropdown() {
    this.setState({ showDropdown: false, hoveredSelectionkey: "" })
  }
  mousedown(event: MouseEvent) {
    if (this.node && this.node.current && event.target) {

      const selfNode = this.node.current
      const clickTarget = event.target as HTMLDivElement
      const compare = selfNode.compareDocumentPosition(clickTarget)
      if (compare < 16) {
        this.hideDropdown()
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
export class Input extends WindowComponent<InputProps, InputState> {
  inputNode: React.RefObject<HTMLInputElement>

  constructor(props: InputProps) {
    super(props);
    this.inputNode = React.createRef();

    this.state = {

    }
  }

  componentDidMount() {
    // let aa = this.WINDOW_STATE.focus;

  }

  render() {
    let classNames = ["WINDOWS-input"]
    if (this.props.actived) {
      classNames.push("WINDOWS-input-actived")
    }
    return (
      <div className={classNames.join(" ")}>
        context:{this.context.focus}
        <input
          ref={this.inputNode}
          value={this.props.value}
          onClick={() => {
            console.log("setFocus", this.COMPONENT_ID)
            console.log("getFocused",  this.COMPONENT.getFocused())
           

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

Input.contextType = WindowContext;
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
type FieldsetProps = {
  title: string
  style: React.CSSProperties
}
export class Fieldset extends React.PureComponent<FieldsetProps, {}> {
  render() {
    return (
      <div className={"WINDOWS-fieldset"} style={{ ...this.props.style }}>
        <fieldset>
          <legend>{this.props.title}</legend>
          <div className={"WINDOWS-fieldset-content"}>
            {this.props.children}
          </div>
        </fieldset>
      </div>
    )
  }

}

