import React from "react"
import "./style.less"


type Letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
type FunctionKey = "Shift" | "Ctrl" | "Alt" | "Tab" | "CapsLock" | "Enter" | "Backspace" | "Delete" | "Esc"
type HotKey = Uppercase<Letter> | Lowercase<Letter> | FunctionKey

type MenuOption = ({
    name: string;
    accessKey?: HotKey;
    shortcutKey?: HotKey[];
    children?: MenuOption
} | {
    type: "hr";
})[]

type WindowMenuState = {
    showingMenu_top?: boolean
    pointerMenu_id?: number
}
export class WindowMenu extends React.PureComponent<{}, WindowMenuState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showingMenu_top: true,
            pointerMenu_id: 0,
        }
    }
    optionData: MenuOption = [
        {
            name: "文件", accessKey: "F",
            children: [
                { name: "新建", accessKey: "N", shortcutKey: ["Ctrl", "N"], },
                { name: "新窗口", accessKey: "W", shortcutKey: ["Ctrl", "Shift", "N"], },
                { name: "打开", accessKey: "O", shortcutKey: ["Ctrl", "O"], },
                { name: "保存", accessKey: "S", shortcutKey: ["Ctrl", "S"], },
                { name: "另存为", accessKey: "A", shortcutKey: ["Ctrl", "Shift", "S"], },
                { type: "hr", },
                { name: "页面设置", accessKey: "U", },
                { name: "打印", accessKey: "P", shortcutKey: ["Ctrl", "P"], },
                { type: "hr", },
                { name: "退出", accessKey: "X", },
            ]
        },
        { name: "编辑", accessKey: "E" },
        { name: "格式", accessKey: "O" },
        { name: "查看", accessKey: "V" },
        { name: "帮助", accessKey: "H" },
    ]







    render() {
        return <div style={{ cursor: "default" }}>
            <div style={{ borderBottom: "#F2F2F2 2px solid", textAlign: "left" }}>
                {Array.from(this.optionData, (item, optionId) => {
                    if ("type" in item) { return <></> } else {
                        return <this.renderTopOption
                            id={optionId}
                            name={item.name}
                            hotkey={item.accessKey}
                            children={item.children}
                            show={this.state.pointerMenu_id === optionId && this.state.showingMenu_top}
                            onClick={(id) => { this.setState({ "showingMenu_top": true, "pointerMenu_id": id }) }}
                            onChange={(id) => { this.setState({ "pointerMenu_id": id }) }}
                        />
                    }
                })}
            </div>
        </div>
    }
    renderTopOption(props: {
        id: number, name: string, hotkey?: string, children?: MenuOption, show?: boolean,
        onClick?: (id: number) => void, onChange?: (id: number) => void
    }) {
        return <div className="WindowMenuOption" style={{ position: "relative" }}
            onPointerDown={() => props.onClick ? props.onClick(props.id) : ""}
            onPointerEnter={() => props.onChange ? props.onChange(props.id) : ""}
            onPointerLeave={() => { }} >
            {props.name}
            {props.hotkey ? `(${props.hotkey})` : ""}
            <div style={{ position: "absolute", top: "100%", left: 0 }}>
                {/* {typeof this} */}
                {/* {typeof this.renderListOption } */}
                {props.show ? <RenderListOption children={props.children} /> : ""}

            </div>
        </div>
    }


}


const RenderListOption = (props: { children?: MenuOption }) => {
    if (!props.children || props.children.length === 0) {
        return <></>
    }
    return <div className="WindowMenuOption-List" style={{
        position: "relative",
        backgroundColor: "#F0F0F0",
        width: 230,
        border: "1px solid #CCCCCC",
        fontSize: 12,
    }}
        onPointerDown={() => { }}
        onPointerLeave={() => { }}
        onPointerEnter={() => { }}>
        {Array.from(props.children, (item) => {
            if ("type" in item) {
                return <div style={{
                    marginLeft: 39, marginRight: 2,
                    height: 1,
                    borderBottom: "1px solid #D7D7D7",
                    marginBottom: 1
                }} />
            } else {
                return <div style={{ marginLeft: 39, marginRight: 2, height: 24, display: "flex", alignItems: "center", justifyContent: `space-between` }} >
                    <div>{item.name}({item.accessKey})</div>
                    <div style={{marginRight:20}}>{Array.from(item.shortcutKey || [], (key, id) => id === 0 ? key : ` +${key}`)}</div>
                </div>
            }
        })}
        {/* {props.name}
            {props.hotkey ? `(${ props.hotkey })` : ""} */}
        {/* <div style={{ position: "absolute", top: "100%", left: 0 }}>
                123
            </div> */}
    </div>
}