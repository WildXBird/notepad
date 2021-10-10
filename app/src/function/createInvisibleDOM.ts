


export function createInvisibleDOM() {
    let newDiv = document.createElement("div");
    newDiv.style.height = "0px"
    newDiv.style.overflow = "hidden"
    newDiv.style.background = "red"
    newDiv.style.width = "100%"
    document.body.appendChild(newDiv);
    return newDiv
}
export function removeDOM(dom:HTMLElement):void {
    if(! dom.parentElement){
        console.error("无法删除dom",dom)
        return
    }
    dom.parentElement.removeChild(dom)
}
