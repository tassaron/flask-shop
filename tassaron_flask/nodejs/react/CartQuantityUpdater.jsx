import { Component } from "react";

let then = Date.now();

class CartQuantityUpdater extends Component {
    constructor(props) {
        super(props);
        this.vanishing = false;
    }

    componentDidMount() {
        this.watchedNode = document.querySelector(`.ProductPage-alert-area[data-product-id='${this.props.productId}']`);
        this.timer = setInterval(
            () => this.tick(),
            3000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    animateVanish(vanisher) {
        let delta = Math.min((Date.now() - then) / (1000 / 60), 2);
        then = Date.now();
        const opacity = window.getComputedStyle(vanisher).getPropertyValue("opacity");
        if (opacity == 0.0) {
            this.watchedNode.removeChild(vanisher);
            this.vanishing = false;
            return;
        }
        vanisher.setAttribute("style", `opacity: ${opacity - (0.05 * delta)}`);
        requestAnimationFrame(
            () => this.animateVanish(vanisher)
        );
    }

    tick() {
        if (this.watchedNode.childElementCount == 0 || this.vanishing) {
            return
        }
        this.vanishing = true;
        const child = this.watchedNode.children[0];
        const message = child.innerText;
        const newValue = Number(message.split(" ")[1]);
        then = Date.now();
        requestAnimationFrame(
            () => this.animateVanish(child)
        );
        this.props.setQuantityFunc(this.props.initialQuantity + newValue);
        this.props.cartBtn.classList.remove("btn-disabled");
    }

    render() {
        return (
            <div
                style={{ visibility: this.props.initialQuantity > 0 ? "visible" : "hidden" }}
                className="product-buttons-cart-indicator-text text-center">
                <strong>
                    {this.props.initialQuantity}
                </strong> in your cart
            </div>
        )
    }
}

export default CartQuantityUpdater