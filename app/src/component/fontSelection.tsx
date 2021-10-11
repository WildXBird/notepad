import * as React from 'react';
import { getFontList } from "../function/getFontList"
import { Window } from "./window"


type AppState = {

}
export class FontSelection extends React.PureComponent<any, AppState> {
    // fontTemp: React.RefObject<HTMLDivElement> | undefined
    constructor(props: {}) {
        super(props);
        // this.textInput = React.createRef();

        this.state = {

        }
    }


    async componentDidMount() {
        const fontInstalled = await getFontList()
        console.log("fontInstalled", fontInstalled)

    }

    render() {
        return (
            <div>
                <Window />
            </div>
        )
    }

}


