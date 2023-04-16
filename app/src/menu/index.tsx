import "./style.less"


const Option = (props: { name: string, hotkey?: string }) => {
    // 50 17
    return <div className="WindowMenuOption" style={{}}>
        {props.name}
        {props.hotkey ? `(${props.hotkey})` : ""}
    </div>
}

export const WindowMenu = () => {
    return <div style={{ cursor: "default" }}>
        23
        <div style={{ borderBottom: "#F2F2F2 2px solid", textAlign: "left" }}>
            <Option name={"文件"} hotkey={"F"} />
            <Option name={"编辑"} hotkey={"E"} />
            <Option name={"格式"} hotkey={"O"} />
            <Option name={"查看"} hotkey={"V"} />
            <Option name={"帮助"} hotkey={"H"} />
        </div>
    </div>
}