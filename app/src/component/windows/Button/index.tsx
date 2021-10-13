import * as React from 'react';
import "./index.less"


type ButtonProps = {
    key?: string
    type?: "primary"
    onMouseUp?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export class Button extends React.PureComponent<ButtonProps, {}> {
    static Group: typeof ButtonGroup;
    render() {
        let classNames = ["WINDOWS-button"]
        if (this.props.type === "primary") { classNames.push("WINDOWS-button-primary") }

        return (
            <div

                className={classNames.join(" ")}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
                onClick={this.props.onClick}>
                <div
                    className={"WINDOWS-button-content"}
                    key={`${this.props.key}-content`}>
                    {this.props.children}
                </div>

            </div>

        )
    }
}


type ButtonGroupProps = {
    children: Array<React.ReactElement<ButtonProps>>
    defaultActivedKey?: string,

}
type ButtonGroupState = {
    lastMouseDownChildKey?: string
    internalActivedChildKey?: string

}

class ButtonGroup extends React.PureComponent<ButtonGroupProps, ButtonGroupState> {
    constructor(props: ButtonGroupProps) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.setState({ internalActivedChildKey: this.props.defaultActivedKey })
        document.addEventListener("mouseup", this.mouseUp.bind(this));
    }
    componentWillUnmount() {
        document.removeEventListener('mouseup', this.mouseUp);

    }
    mouseUp(event: MouseEvent) {
        console.log(event)
        this.setState({ internalActivedChildKey: this.state.lastMouseDownChildKey })

    }
    render() {
        const children: React.ReactElement[] = []

        this.props.children.map((component, cid) => {
            if (component.type === Button) {
                const thisKey = (typeof component.key === "string" || typeof (component.key) === "number") ? String(component.key) : `ButtonGroup-${cid}`
                children.push(React.cloneElement<ButtonProps>(
                    component,
                    {
                        key: thisKey,
                        type: (() => (this.state.internalActivedChildKey) ?
                            (thisKey === this.state.internalActivedChildKey ? "primary" : undefined) :
                            ((cid === 0) ? "primary" : undefined))(),
                        onMouseDown: () => { this.setState({ lastMouseDownChildKey: thisKey }) },
                    },
                    // [...children]
                ))
            } else {
                console.warn("ButtonGroup 的子组件只能是 Button")
            }
        })


        return (
            <div>
                {children}
            </div>

        )
    }
}

// const aa = <div>
//     <ButtonGroup>
//         <div style={{ height: 1 }}></div>
//         <Button type="primary">
//             {"确定"}
//         </Button>
//     </ButtonGroup>
// </div>
Button.Group = ButtonGroup




