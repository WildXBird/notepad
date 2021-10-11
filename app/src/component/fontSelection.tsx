import * as React from 'react';
import { getFontList, isSupportFontWeight, fontWeight } from "../function/getFontList"
import { Window, Select, SelectionData } from "./windows"
import "./fontSelection.less"

type FontInstalled = {
    en_name: string;
    cn_name: string;
}
type AppState = {
    fontInstalled?: FontInstalled[]
    fontInstalled4Select?: SelectionData<string>[]
    currentSelectedFont: string
}




// bolder
// bold
// normal
// lighter

export class FontSelection extends React.PureComponent<{}, AppState> {
    // fontTemp: React.RefObject<HTMLDivElement> | undefined
    fontWeightTestList: {
        id: number,
        text: string,
        testWeight: fontWeight
        value: React.CSSProperties
    }[]
    constructor(props: {}) {
        super(props);
        this.fontWeightTestList = [
            {
                id: 1,
                text: "细体",
                testWeight: "lighter",
                value: { fontWeight: "lighter", },
            },
            {
                id: 2,
                text: "常规",
                testWeight: "normal",
                value: { fontWeight: "normal", },
            },
            {
                id: 3,
                text: "粗体",
                testWeight: "bold",
                value: { fontWeight: "bold", },
            },
            {
                id: 5,
                text: "细体倾斜",
                testWeight: "lighter",
                value: { fontWeight: "lighter", fontStyle: "italic" },
            },
            {
                id: 6,
                text: "倾斜",
                testWeight: "normal",
                value: { fontWeight: "normal", fontStyle: "italic" },
            },
            {
                id: 7,
                text: "粗偏斜体",
                testWeight: "bold",
                value: { fontWeight: "bold", fontStyle: "italic" },
            },
        ]
        this.state = {
            currentSelectedFont: "Microsoft Yahei"
        }
    }


    async componentDidMount() {
        const fontInstalled = await getFontList()
        const fontInstalled4Select: SelectionData<string>[] = []
        for (let item of (fontInstalled)) {
            fontInstalled4Select.push({ text: item.cn_name, value: item.en_name })
        }
        this.setState({ fontInstalled, fontInstalled4Select })
    }



    render() {
        const currnetFontSupportWeightList: {
            text: string,
            value: React.CSSProperties
        }[] = []
        for (let item of this.fontWeightTestList) {
            if (item.text === "幼圆") {
                console.log("isSupportFontWeight幼圆",
                    isSupportFontWeight(this.state.currentSelectedFont || "", "lighter"))

            }
            if (isSupportFontWeight(this.state.currentSelectedFont, item.testWeight)) {
                currnetFontSupportWeightList.push({
                    text: item.text,
                    value: item.value
                })
            }
        }
        return (
            <Window
                width={427}
                height={529}
            >
                <div className={"fontSelection"}>
                    <div style={{ width: 172, marginLeft: 12 }}>
                        <Select
                            data={this.state.fontInstalled4Select || []}
                            // defaultValue={"Microsoft Yahei"}
                            style={{ height: 137 }}
                            renderStyle={(item) => ({ fontFamily: `"${item.value}"`, })}
                            onChange={(item) => {
                                this.setState({
                                    currentSelectedFont: item.value
                                })
                            }}
                        />
                    </div>
                    <div style={{ width: 130, marginLeft: 16 }}>
                        <Select
                            data={currnetFontSupportWeightList}
                            defaultValue={currnetFontSupportWeightList[1].value}
                            style={{ height: 137 }}
                            renderStyle={(item) => ({ fontFamily: `"${this.state.currentSelectedFont}"`, ...item.value })}
                            onChange={(item) => {

                            }}
                        />
                    </div>

                    <div style={{ width: 62, marginLeft: 17 }}>
                        3
                    </div>


                </div>

            </Window>
        )
    }

}
type FontSelectorProps = {
    fontInstalled: FontInstalled[]
    defalultFont?: string
}


// type FontSelectorProps = {
//     fontInstalled: FontInstalled[]
//     defalultFont?: string
// }

// function FontSelector(props: FontSelectorProps) {
//     const data: SelectionData[] = []
//     for (let item of (props.fontInstalled)) {
//         data.push({ text: item.cn_name, value: item.en_name })
//     }
//     return (
//         <Select
//             data={data}
//             defaultValue={props.defalultFont}
//             style={{ height: 137 }}
//             renderStyle={(item) => ({ fontFamily: `"${item.value}",Arial`, })}
//         />
//     )
// }


