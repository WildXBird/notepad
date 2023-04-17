import React from "react"
import "./style.less"



type MenuOption = ({
    name: string;
    hotkey?: string;
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
        this.state = {}
    }
    optionData: MenuOption = [
        {
            name: "文件", hotkey: "F",
            children: [
                { name: "新建", },
                { name: "新窗口", },
                { name: "打开", },
                { name: "保存", },
                { name: "另存为", },
                { type: "hr", },
                { name: "页面设置", },
                { name: "打印", },
                { type: "hr", },
                { name: "退出", },
            ]
        },
        { name: "编辑", hotkey: "E" },
        { name: "格式", hotkey: "O" },
        { name: "查看", hotkey: "V" },
        { name: "帮助", hotkey: "H" },
    ]







    render() {
        return <div style={{ cursor: "default" }}>
            <div style={{ borderBottom: "#F2F2F2 2px solid", textAlign: "left" }}>
                {Array.from(this.optionData, (item, optionId) => {
                    if ("type" in item) { return <></> } else {
                        return <this.renderTopOption
                            id={optionId}
                            name={item.name}
                            hotkey={item.hotkey}
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
        width: 330,
        border: "1px solid #CCCCCC"
    }}
        onPointerDown={() => { }}
        onPointerLeave={() => { }}
        onPointerEnter={() => { }}>
        {Array.from(props.children, (item) => {
            if ("type" in item) {
                return <div style={{ marginLeft: 39, marginRight: 2, backgroundColor: "#D7D7D7", height: 1 }} />
            } else {
                return <div style={{ marginLeft: 39, marginRight: 2, height: 30, display: "flex", alignItems: "center" }} >
                    {item.name}
                </div>
            }
        })}
        {/* {props.name}
            {props.hotkey ? `(${props.hotkey})` : ""} */}
        {/* <div style={{ position: "absolute", top: "100%", left: 0 }}>
                123
            </div> */}
    </div>
}