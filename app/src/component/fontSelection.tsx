import * as React from 'react';
import { getFontList, isSupportFontWeight, fontWeight } from "../function/getFontList"
import { Window, Select, SelectionData, Input, Paragraph } from "./windows"
import "./fontSelection.less"

type FontInstalled = {
    en_name: string;
    cn_name: string;
}
type AppState = {
    fontInstalled?: FontInstalled[]
    fontInstalled4Select?: SelectionData<string>[]
    currentSelectedFont: string
    currentInputedFontText: string

    currentSelectedFontStyleId: number
    currentInputedFontStyleText: string
    currentInputedFontStyle: React.CSSProperties

    currentSelectedFontSize: string
    currentInputedFontSizeText: string

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
    fontSizeList: {
        text: string,
        value: string,
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
        this.fontSizeList = [
            { text: "8", value: "8pt" },
            { text: "9", value: "9pt" },
            { text: "10", value: "10pt" },
            { text: "11", value: "11pt" },
            { text: "12", value: "12pt" },
            { text: "14", value: "14pt" },
            { text: "16", value: "16pt" },
            { text: "18", value: "18pt" },
            { text: "20", value: "20pt" },
            { text: "22", value: "22pt" },
            { text: "24", value: "24pt" },
            { text: "26", value: "26pt" },
            { text: "28", value: "28pt" },
            { text: "36", value: "36pt" },
            { text: "48", value: "48pt" },
            { text: "72", value: "72pt" },
            { text: "初号", value: "14.82mm" },
            { text: "小初", value: "12.7mm" },
            { text: "一号", value: "9.17mm" },
            { text: "小一", value: "8.47mm" },
            { text: "二号", value: "7.76mm" },
            { text: "小二", value: "6.35mm" },
            { text: "三号", value: "5.64mm" },
            { text: "小三", value: "5.29mm" },
            { text: "四号", value: "4.94mm" },
            { text: "小四", value: "4.23mm" },
            { text: "五号", value: "3.7mm" },
            { text: "小五", value: "3.18mm" },
            { text: "六号", value: "2.65mm" },
            { text: "小六", value: "2.29mm" },
            { text: "七号", value: "1.845mm" },
            { text: "八号", value: "1.581mm" }
        ]

        this.state = {
            currentSelectedFont: "Microsoft Yahei",
            currentInputedFontText: "微软雅黑",

            currentSelectedFontStyleId: this.fontWeightTestList[1].id,
            currentInputedFontStyleText: this.fontWeightTestList[1].text,
            currentInputedFontStyle: this.fontWeightTestList[1].value,

            currentSelectedFontSize: "4.23mm",
            currentInputedFontSizeText: "小四",
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
            id: number,
            text: string,
            value: React.CSSProperties
        }[] = []
        for (let item of this.fontWeightTestList) {
            if (isSupportFontWeight(this.state.currentSelectedFont, item.testWeight)) {
                currnetFontSupportWeightList.push({
                    id: item.id,
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
                        <Paragraph>{"字体("}<u>{"F"}</u>{"):"}</Paragraph>
                        <Input actived clickToSelectAll value={this.state.currentInputedFontText} />
                        <Select
                            data={this.state.fontInstalled4Select || []}
                            value={this.state.currentSelectedFont}
                            style={{ height: 137 }}
                            renderStyle={(item) => ({ fontFamily: `"${item.value}"`, })}
                            onChange={(item) => {
                                this.setState({
                                    currentSelectedFont: item.value,
                                    currentInputedFontText: item.text
                                })
                            }}
                        />
                    </div>
                    <div style={{ width: 130, marginLeft: 16 }}>
                        <Paragraph>{"字形("}<u>{"Y"}</u>{"):"}</Paragraph>
                        <Input actived clickToSelectAll value={this.state.currentInputedFontStyleText} />
                        <Select
                            data={currnetFontSupportWeightList}
                            value={this.state.currentInputedFontStyle}
                            style={{ height: 137 }}
                            renderStyle={(item) => ({ fontFamily: `"${this.state.currentSelectedFont}"`, lineHeight: "19px", ...item.value })}
                            onChange={(item) => {
                                this.setState({
                                    currentSelectedFontStyleId: item.id || 1,
                                    currentInputedFontStyleText: item.text,
                                    currentInputedFontStyle: item.value
                                })
                            }}
                        />
                    </div>
                    <div style={{ width: 62, marginLeft: 17, verticalAlign: "top" }}>
                        <Paragraph>{"大小("}<u>{"S"}</u>{"):"}</Paragraph>
                        <Input actived clickToSelectAll value={this.state.currentInputedFontSizeText} />
                        <Select
                            data={this.fontSizeList}
                            value={this.state.currentSelectedFontSize}
                            style={{ height: 123 }}
                            renderStyle={(item) => ({ fontSize: 12, paddingLeft: 1, lineHeight: "19px" })}
                            onChange={(item) => {
                                this.setState({
                                    currentInputedFontSizeText: item.text,
                                    currentSelectedFontSize: item.value
                                })
                            }}
                        />
                    </div>
                    <div style={{ width: "100%", marginLeft: 17, verticalAlign: "top" }}>
                        <Paragraph>{"大小("}<u>{"S"}</u>{"):"}</Paragraph>
                        <Input actived clickToSelectAll value={this.state.currentInputedFontSizeText} />
                        <Select
                            data={this.fontSizeList}
                            value={this.state.currentSelectedFontSize}
                            style={{ height: 123 }}
                            renderStyle={(item) => ({ fontSize: 12, paddingLeft: 1, lineHeight: "19px" })}
                            onChange={(item) => {
                                this.setState({
                                    currentInputedFontSizeText: item.text,
                                    currentSelectedFontSize: item.value
                                })
                            }}
                        />
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


