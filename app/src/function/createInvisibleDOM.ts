


export function createInvisibleDOM(visible = false) {
    let newDiv = document.createElement("div");
    if (!visible) {
        newDiv.style.height = "0px"
        newDiv.style.overflow = "hidden"
    } else {
        newDiv.style.position = "fixed"
        newDiv.style.top = "0px"
        newDiv.style.left = "64px"
    }
    newDiv.style.background = "#94a995"
    newDiv.style.width = "100%"
    document.body.appendChild(newDiv);
    return newDiv
}
export function removeDOM(dom: HTMLElement): void {
    if (!dom.parentElement) {
        console.error("无法删除dom", dom)
        return
    }
    dom.parentElement.removeChild(dom)
}
