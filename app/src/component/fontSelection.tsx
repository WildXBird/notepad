import * as React from 'react';
import { getFontList, isSupportFontWeight, fontWeight, getFontSupportScript } from "../function/getFontList"
import { Window, Select, SelectionData, Input, Paragraph, Fieldset } from "./windows"
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

    currnetSupportedFontStyleList: {
        key: string,
        text: string,
        data: React.CSSProperties
    }[],
    currentSelectedFontStyleKey: string
    currentInputedFontStyleText: string
    currentInputedFontStyleData: React.CSSProperties

    currentSelectedFontSize: string
    currentInputedFontSizeText: string

    currentFontSupportedScript: { name: string, key: string, sampleText: string }[]
    currentFontSupportedScriptForSelect: { text: string, key: string, data: string }[]
    currentFontSupportedScriptSelectedKey: string
    currentFontSupportedScriptSelectedSampleText: string

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
        key: string,
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
            { text: "8", key: "8pt" },
            { text: "9", key: "9pt" },
            { text: "10", key: "10pt" },
            { text: "11", key: "11pt" },
            { text: "12", key: "12pt" },
            { text: "14", key: "14pt" },
            { text: "16", key: "16pt" },
            { text: "18", key: "18pt" },
            { text: "20", key: "20pt" },
            { text: "22", key: "22pt" },
            { text: "24", key: "24pt" },
            { text: "26", key: "26pt" },
            { text: "28", key: "28pt" },
            { text: "36", key: "36pt" },
            { text: "48", key: "48pt" },
            { text: "72", key: "72pt" },
            { text: "初号", key: "14.82mm" },
            { text: "小初", key: "12.7mm" },
            { text: "一号", key: "9.17mm" },
            { text: "小一", key: "8.47mm" },
            { text: "二号", key: "7.76mm" },
            { text: "小二", key: "6.35mm" },
            { text: "三号", key: "5.64mm" },
            { text: "小三", key: "5.29mm" },
            { text: "四号", key: "4.94mm" },
            { text: "小四", key: "4.23mm" },
            { text: "五号", key: "3.7mm" },
            { text: "小五", key: "3.18mm" },
            { text: "六号", key: "2.65mm" },
            { text: "小六", key: "2.29mm" },
            { text: "七号", key: "1.845mm" },
            { text: "八号", key: "1.581mm" }
        ]


        this.state = {
            currentSelectedFont: "Microsoft Yahei",
            currentInputedFontText: "微软雅黑",

            currnetSupportedFontStyleList: this.getSupportedStyleList("Microsoft Yahei"),
            currentSelectedFontStyleKey: String(this.fontWeightTestList[1].id),
            currentInputedFontStyleText: this.fontWeightTestList[1].text,
            currentInputedFontStyleData: this.fontWeightTestList[1].value,

            currentSelectedFontSize: "4.23mm",
            currentInputedFontSizeText: "小四",
            currentFontSupportedScript: [],
            currentFontSupportedScriptForSelect: [],
            currentFontSupportedScriptSelectedKey: "",
            currentFontSupportedScriptSelectedSampleText: "",
        }

    }


    async componentDidMount() {
        const fontInstalled = await getFontList()
        const fontInstalled4Select: SelectionData<string>[] = []
        for (let item of (fontInstalled)) {
            fontInstalled4Select.push({ text: item.cn_name, key: item.en_name })
        }
        const supportedScriptNewState = await this.calcSupportedScriptNewState(this.state.currentSelectedFont)
        this.setState({ fontInstalled, fontInstalled4Select, ...supportedScriptNewState })
    }



    render() {
        return (
            <Window
                width={427}
                height={529}
            >
                <div className={"fontSelection"}>
                    <div style={{ width: 172, marginLeft: 12 }}>
                        <Paragraph>{"字体("}<u>{"F"}</u>{"):"}</Paragraph>
                        <Input actived clickToSelectAll value={this.state.currentInputedFontText} />
                        <Select<string>
                            data={this.state.fontInstalled4Select || []}
                            activedKey={this.state.currentSelectedFont}
                            style={{ height: 137 }}
                            renderStyle={(item) => ({ fontFamily: `"${item.key}"`, })}
                            onChange={async (item) => {
                                const supportedScriptNewState = await this.calcSupportedScriptNewState(item.key)
                                this.setState({
                                    currnetSupportedFontStyleList: this.getSupportedStyleList(item.key),
                                    currentSelectedFont: item.key,
                                    currentInputedFontText: item.text,
                                    ...supportedScriptNewState
                                })
                                // await this.updateSupportedScript()

                            }}
                        />
                    </div>
                    <div style={{ width: 130, marginLeft: 16 }}>
                        <Paragraph>{"字形("}<u>{"Y"}</u>{"):"}</Paragraph>
                        <Input actived clickToSelectAll value={this.state.currentInputedFontStyleText} />
                        <Select
                            data={this.state.currnetSupportedFontStyleList}
                            activedKey={this.state.currentSelectedFontStyleKey}
                            style={{ height: 137 }}
                            renderStyle={(item) => ({ fontFamily: `"${this.state.currentSelectedFont}"`, lineHeight: "19px", ...item.data })}
                            onChange={(item) => {
                                this.setState({
                                    currentSelectedFontStyleKey: item.key,
                                    currentInputedFontStyleText: item.text,
                                    currentInputedFontStyleData: item.data || {}
                                })
                            }}
                        />
                    </div>
                    <div style={{ width: 62, marginLeft: 17, verticalAlign: "top" }}>
                        <Paragraph>{"大小("}<u>{"S"}</u>{"):"}</Paragraph>
                        <Input actived clickToSelectAll value={this.state.currentInputedFontSizeText} />
                        <Select
                            data={this.fontSizeList}
                            activedKey={this.state.currentSelectedFontSize}
                            style={{ height: 123 }}
                            renderStyle={(item) => ({ fontSize: 12, paddingLeft: 1, lineHeight: "19px" })}
                            onChange={(item) => {
                                this.setState({
                                    currentInputedFontSizeText: item.text,
                                    currentSelectedFontSize: item.key
                                })
                            }}
                        />
                    </div>
                    {/* //新一行 */}
                    <div style={{ width: 172, marginLeft: 12 }} />
                    <div style={{ width: 210, marginLeft: 17, verticalAlign: "top" }}>
                        <Fieldset title={"示例"} style={{ width: "100%", height: 90, marginBottom: 10 }}>
                            <span style={{ ...this.calcFontStyle(), }} dir="ltr">
                                {this.state.currentFontSupportedScriptSelectedSampleText}
                            </span>
                        </Fieldset>

                        <Paragraph>{"脚本("}<u>{"R"}</u>{"):"}</Paragraph>
                        <Select
                            data={this.state.currentFontSupportedScriptForSelect}
                            activedKey={this.state.currentFontSupportedScriptSelectedKey}
                            style={{ height: 123 }}
                            renderStyle={(item) => ({ fontSize: 12, paddingLeft: 1, lineHeight: "19px" })}
                            onChange={(item) => {
                                this.setState({
                                    currentFontSupportedScriptSelectedKey: item.key,
                                    currentFontSupportedScriptSelectedSampleText: item.data || "",

                                })
                            }}
                        />
                    </div>


                </div>

            </Window>
        )
    }
    calcFontStyle() {
        let style: React.CSSProperties = {}
        if (this.state.currentSelectedFont) {
            style.fontFamily = `"${this.state.currentSelectedFont}"`
        }
        if (this.state.currentInputedFontStyleData) {
            style.fontWeight = this.state.currentInputedFontStyleData.fontWeight
            style.fontStyle = this.state.currentInputedFontStyleData.fontStyle
        }
        if (this.state.currentSelectedFontSize) {
            style.fontSize = this.state.currentSelectedFontSize
            style.lineHeight = this.state.currentSelectedFontSize
        }
        return style
    }
    async calcSupportedScriptNewState(currentSelectedFont: string) {
        let state: {
            currentFontSupportedScript: AppState["currentFontSupportedScript"]
            currentFontSupportedScriptForSelect: AppState["currentFontSupportedScriptForSelect"]
            currentFontSupportedScriptSelectedKey: AppState["currentFontSupportedScriptSelectedKey"]
            currentFontSupportedScriptSelectedSampleText: AppState["currentFontSupportedScriptSelectedSampleText"]
        } = {
            currentFontSupportedScript: this.state["currentFontSupportedScript"],
            currentFontSupportedScriptForSelect: this.state["currentFontSupportedScriptForSelect"],
            currentFontSupportedScriptSelectedKey: this.state["currentFontSupportedScriptSelectedKey"],
            currentFontSupportedScriptSelectedSampleText: this.state["currentFontSupportedScriptSelectedSampleText"],
        }

        const SupportedScript = await getFontSupportScript(currentSelectedFont)

        const currentFontSupportedScriptForSelect: AppState["currentFontSupportedScriptForSelect"] = []
        for (let item of SupportedScript) {
            currentFontSupportedScriptForSelect.push({
                text: item.name,
                key: item.key,
                data: item.sampleText
            })
        }

        state.currentFontSupportedScript = SupportedScript
        state.currentFontSupportedScriptForSelect = currentFontSupportedScriptForSelect

        if (SupportedScript.length > 0) {
            if (!this.state.currentFontSupportedScriptSelectedKey) {
                for (let item of SupportedScript) {
                    state.currentFontSupportedScriptSelectedKey = item.key
                    state.currentFontSupportedScriptSelectedSampleText = item.sampleText
                    break
                }

            }
        }
        // this.setState(state)
        return state
    }

    getSupportedStyleList(currentSelectedFont?: string) {
        const currnetFontSupportWeightList: AppState["currnetSupportedFontStyleList"] = []
        for (let item of this.fontWeightTestList) {
            if (isSupportFontWeight(currentSelectedFont || this.state.currentSelectedFont, item.testWeight)) {
                currnetFontSupportWeightList.push({
                    key: String(item.id),
                    text: item.text,
                    data: item.value
                })
            }
        }
        return currnetFontSupportWeightList
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


