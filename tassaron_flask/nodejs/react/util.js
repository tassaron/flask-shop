let then;

export function getNodeOrError(name) {
    const node = document.getElementById(name);
    if (!node) {
        throw new ReferenceError(`Missing DOM node with ID ${name}`);
    }
    return node;
}

export function getChildOrError(parentNode, className) {
    const nodes = parentNode.getElementsByClassName(className);
    if (nodes.length != 1) {
        throw new ReferenceError(
            `${parentNode.className} has ${nodes.length} DOM nodes with class "${className}"; there should be 1`
        );
    }
    return nodes[0];
}

/** 
* Animates DOM element to reduce its opacity over time. Use callback to remove from DOM
* @param {HTMLElement} vanisher - DOM node to operate on
*/
export function animateVanish(vanisher, callback) {
    if (then === undefined) {
        then = Date.now();
    }
    let delta = Math.min((Date.now() - then) / (1000 / 60), 2);
    then = Date.now();
    const opacity = window
        .getComputedStyle(vanisher)
        .getPropertyValue("opacity");
    if (opacity <= 0.0) {
        callback();
        return;
    }
    vanisher.setAttribute("style", `opacity: ${opacity - 0.05 * delta}`);
    requestAnimationFrame(() => animateVanish(vanisher, callback));
}
