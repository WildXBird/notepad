import * as React from 'react';
import { GUID } from "../../function/guid";
import "./windows.less";

import { Button } from "./Button";
export * from "./Button";

export let WindowContext = React.createContext<WindowContextProps>({
  focus: '_unset',
  setFocus: () => { },
});
WindowContext.displayName = 'MyDisplayName'
export type WindowContextProps = {
  focus: string
  setFocus: (next: string) => void,
}

type WindowProps = {
  width?: number
  height?: number
  title: string
  onClose?: () => void
  visible?: boolean
}
type WindowState = {
  /**window是否显示 */
  visible: boolean
  /**style的display属性 */
  display: boolean
  windowFocus: string
}
type Window_TitleButton = "minimize" | "maximize" | "close"
export class Window extends React.PureComponent<WindowProps, WindowState> {
  WINDOW: React.RefObject<HTMLDivElement>
  WINDOW_title: React.RefObject<HTMLDivElement>
  moving: boolean
  mouseMovingTitleBarOffsetX: number
  mouseMovingTitleBarOffsetY: number

  titleHeight: number
  titleButtonWidth: number
  titleIcon: {
    [K in Window_TitleButton]: React.SVGProps<SVGSVGElement>;
  }
  left: number
  top: number


  static open: () => Promise<void>;

  constructor(props: WindowProps) {
    super(props);
    this.WINDOW = React.createRef();
    this.WINDOW_title = React.createRef();
    this.moving = false
    this.mouseMovingTitleBarOffsetX = 0
    this.mouseMovingTitleBarOffsetY = 0

    this.titleHeight = 30
    this.titleButtonWidth = 45
    this.left = 60
    this.top = 60
    if (props.width) {
      const webViewWidth = window.innerWidth
      this.left = Math.max(Math.round((webViewWidth - props.width) / 2), 0)
    }
    if (props.height) {
      const webViewHeight = window.innerHeight
      this.top = Math.max(Math.round((webViewHeight - props.height) / 2), 0)
    }

    this.titleIcon = {
      minimize: <svg x="0px" y="0px" viewBox="0 0 10 1" data-radium="true" style={{ width: 10, height: 10 }}>
        <line x1="0" y1="0" x2="10" y2="0" style={{ stroke: "#000000", strokeWidth: 1 }}></line>
      </svg>,
      maximize: <svg x="0px" y="0px" viewBox="0 0 10 10" data-radium="true" style={{ width: 10, height: 10 }}>
        <path fill="#000000" d="M0,0v10h10V0H0z M9,9H1V1h8V9z" />
      </svg>,
      close: <svg x="0px" y="0px" viewBox="0 0 10 10" data-radium="true" style={{ width: 10, height: 10 }}>
        <polygon fill="#000000" points="10,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10 5.1,5.8 9.5,10 10,9.5 5.8,5.1 "></polygon>
      </svg>,

    }

    this.state = {
      visible: false,
      display: false,
      windowFocus: "_unset"
    }
  }

  async componentDidMount() {
    if (this.WINDOW_title?.current && this.WINDOW?.current) {
      this.WINDOW_title.current.addEventListener('mousedown', this.titleBarMousedown.bind(this));
      this.WINDOW_title.current.addEventListener("touchstart", this.titleBarMousedown.bind(this));
      this.WINDOW.current.addEventListener('mousedown', this.windowMouseDown.bind(this));
      this.WINDOW.current.addEventListener('touchstart', this.windowMouseDown.bind(this));
      document.addEventListener('mouseup', this.mouseup.bind(this));
      document.addEventListener("touchend", this.mouseup.bind(this));
      document.addEventListener('mousemove', this.mousemove.bind(this));
      document.addEventListener("touchmove", this.mousemove.bind(this));
    } else {
      console.error("WINDOW", "not readt")
    }
    setTimeout(() => {
      this.checkWindowVisible()
    }, 0);
  }
  componentWillUnmount() {
    if (this.WINDOW_title?.current) {
      this.WINDOW_title.current.removeEventListener('mousedown', this.titleBarMousedown);
      this.WINDOW_title.current.removeEventListener('touchstart', this.titleBarMousedown);
    }
    if (this.WINDOW?.current) {
      this.WINDOW.current.addEventListener('mousedown', this.windowMouseDown.bind(this));
      this.WINDOW.current.addEventListener('touchstart', this.windowMouseDown.bind(this));
    }
    document.removeEventListener('mouseup', this.mouseup);
    document.removeEventListener('touchend', this.mouseup);
    document.removeEventListener('mousemove', this.mousemove);
    document.removeEventListener('touchmove', this.mousemove);
  }
  componentDidUpdate() {
    this.checkWindowVisible()
  }
  render() {
    let windowHeight = 400
    if (this.props.height) {
      windowHeight = this.props.height + this.titleHeight
    }
    const classNames = ["WINDOWS-window"]
    let scale = 0.9
    if (this.state.display) {
      classNames.push("WINDOWS-window-display")

    }
    if (this.state.visible) {
      classNames.push("WINDOWS-window-visible")
      scale = 1
    }

    const titleButtons: Window_TitleButton[] = ["minimize", "maximize", "close"]

    return (
      <WindowContext.Provider value={{
        focus: this.state.windowFocus,
        setFocus: (next: string) => { this.setState({ windowFocus: next }) }
      }}>
        <div
          ref={this.WINDOW}
          className={classNames.join(" ")}
          style={{
            height: windowHeight,
            width: this.props.width || 300,
            transform: `translate(${this.left}px, ${this.top}px) scale(${scale})`,
            // transition,
          }}>
          <div ref={this.WINDOW_title} className={"WINDOWS-title"}
            style={{ width: `calc(100% - ${titleButtons.length * this.titleButtonWidth}px)` }}
          >
            {this.props.title}
          </div>
          {Array.from(titleButtons, (item) => {
            return <div key={item} className={`WINDOWS-titleButton WINDOWS-titleButton-${item}`}
              style={{ width: this.titleButtonWidth }}
              onClick={() => { this.titleButtonAction(item) }} >
              <div>{this.titleIcon[item]}</div>
            </div>
          })}

          <div className={"WINDOWS-content"}>
            {this.props.children}
          </div>
        </div>
      </WindowContext.Provider>
    )
  }

  titleBarMousedown(event: MouseEvent | TouchEvent) {
    event.preventDefault()//IOS

    this.moving = true
    let left: number
    let top: number

    if (event instanceof MouseEvent) {
      left = event.offsetX
      top = event.offsetY
    } else if (event.target instanceof HTMLElement) {
      var rect = event.target.getBoundingClientRect();
      var x = event.targetTouches[0].pageX - rect.left;
      var y = event.targetTouches[0].pageY - rect.top;
      left = x
      top = y
    } else {
      left = 0
      top = 0
    }

    this.mouseMovingTitleBarOffsetX = left
    this.mouseMovingTitleBarOffsetY = top
  }
  windowMouseDown(event: MouseEvent | TouchEvent) {
    if (!event.target) {
      return
    }
    if (event.target instanceof HTMLElement) {

      switch (event.target.tagName) {
        case "INPUT":
        case "A":

          return

        default:
          break;
      }
    }


    event.preventDefault()
  }
  mousemove(event: MouseEvent | TouchEvent) {
    if (!this.moving) { return }

    let left: number
    let top: number
    if (event instanceof MouseEvent) {
      left = event.clientX - this.mouseMovingTitleBarOffsetX
      top = event.clientY - this.mouseMovingTitleBarOffsetY
    } else {
      left = (event.touches[0].clientX) - this.mouseMovingTitleBarOffsetX
      top = (event.touches[0].clientY) - this.mouseMovingTitleBarOffsetY
    }

    if (this.WINDOW?.current) {
      this.left = left
      this.top = top
      let scale = this.state.visible ? 1 : 0.9

      this.WINDOW.current.style.transition = "transform 0s, opacity 0s"
      this.WINDOW.current.style.transform = `translate(${left}px, ${top}px) scale(${scale})`
    }
  }
  mouseup() {
    if (this.moving) {
      console.log("mouseup")
      this.moving = false
    }
  }
  checkWindowVisible() {
    if (this.props.visible !== this.state.visible) {
      if (this.props.visible) {
        this.openWindow()
      } else {
        this.closeWindow()
      }
    }
  }
  openWindow() {
    if (this.WINDOW.current) {
      this.WINDOW.current.style.transition = ""
    }
    this.setState({ display: true, })
    setTimeout(() => {
      this.setState({ visible: true })
    }, 0);
  }
  closeWindow() {
    console.log("closeWindow")
    if (this.WINDOW.current) {
      this.WINDOW.current.style.transition = ""
    }
    this.setState({ visible: false, })
    setTimeout(() => {
      this.setState({ display: false })
    }, 1000);
  }
  titleButtonAction(type: Window_TitleButton) {
    switch (type) {
      case "close":
        if (this.props.onClose) { this.props.onClose() }
        break;

      default:
        break;
    }
  }
}


type ModalProps = {
  width?: number
  height?: number
  title?: string
  onOK?: () => void
  onCancel?: () => void
}
type ModalState = {
  visible?: boolean
}
export class Modal extends React.PureComponent<ModalProps, ModalState> {
  footerHeight: number
  constructor(props: ModalProps) {
    super(props);
    this.footerHeight = 48
    this.state = {
      visible: true

    }
  }

  async componentDidMount() {

  }
  componentWillUnmount() {

  }
  render() {
    return (
      <Window
        title={this.props.title || "无标题"}
        width={this.props.width}
        visible={this.state.visible}
        onClose={this.onCancel.bind(this)}
        height={((this.props.height || 0) + this.footerHeight)}>
        <div style={{
          height: this.props.height, width: "100%",
          zIndex: 1, position: "relative"
        }}>
          {this.props.children}
        </div>
        <div style={{ height: this.footerHeight }}>
          <Button.Group style={{
            position: "absolute",
            right: 9,
            bottom: 6,
          }}>
            <Button type="primary" onClick={this.onOK.bind(this)}>
              {"确定"}
            </Button>
            <Button onClick={this.onCancel.bind(this)}>
              {"取消"}
            </Button>
          </Button.Group>
        </div>
      </Window >
    )
  }
  onCancel() {
    this.closeModal()
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }
  onOK() {
    this.closeModal()
    if (this.props.onOK) {
      this.props.onOK()
    }
  }
  closeModal() {
    this.setState({
      visible: false
    })
  }
}


class WindowComponent<P, S> extends React.PureComponent<P, S> {
  protected COMPONENT_ID: string
  static contextType = WindowContext;

  protected COMPONENT: {
    isFocused: () => boolean | undefined
    focus: () => void | undefined
  };

  constructor(props: P) {
    super(props);
    this.COMPONENT_ID = GUID()
    const tryContent = () => {
      return typeof (this.context) === "object"
    }
    this.COMPONENT = {
      isFocused: () => {
        if (tryContent()) {
          const WINDOW_STATE: WindowContextProps = this.context
          return WINDOW_STATE.focus === this.COMPONENT_ID
        }
      },
      focus: () => {
        if (tryContent()) {
          const WINDOW_STATE: WindowContextProps = this.context
          return WINDOW_STATE.setFocus(this.COMPONENT_ID)
        }
      }
    }

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
      showDropdown: false
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
        className={`WINDOWS-dropdownSelect ${this.state.showDropdown ? "WINDOWS-dropdownSelect-showDropdown" : ""}`}>
        <div className={"WINDOWS-dropdownSelect-box"}
          onClick={() => { this.setState({ showDropdown: !this.state.showDropdown, hoveredSelectionkey: "" }) }}
        >
          <div className={`WINDOWS-dropdownSelect-currentSelected ${this.state.showDropdown ? "WINDOWS-dropdownSelect-currentSelected-active" : ""}`} >
            {currentSelectedText}
          </div>
          <div className={"WINDOWS-dropdownSelect-arrow"} />
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
  primary?: boolean
  value?: string
  ref?: string
  style?: React.CSSProperties
  onChange?: (newValue: string, event: React.ChangeEvent<HTMLInputElement>) => void
}
type InputState = {
}
export class Input extends WindowComponent<InputProps, InputState> {
  inputNode: React.RefObject<HTMLInputElement>
  ignoreNextMouseUp?: boolean

  constructor(props: InputProps) {
    super(props);
    this.inputNode = React.createRef();
  }

  render() {
    let classNames = ["WINDOWS-input"]

    if (this.props.primary) {
      classNames.push("WINDOWS-input-primary")
    }

    return (
      <div className={classNames.join(" ")}>
        <input
          ref={this.inputNode}
          value={this.props.value}
          onMouseDown={() => {
            if (!this.COMPONENT.isFocused()) {
              this.COMPONENT.focus()
              if (this.inputNode && this.inputNode.current) {
                this.ignoreNextMouseUp = true
                this.inputNode.current.focus()
                this.inputNode.current.select()
              }
            }
          }}
          onMouseUp={(event) => {
            if (this.ignoreNextMouseUp) {
              this.ignoreNextMouseUp = false
              event.preventDefault()
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

