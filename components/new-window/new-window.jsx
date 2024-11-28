import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";

class NewWindowComponent extends Component {
    // The container for the new window's content
    containerEl = document.createElement("div");
    style = document.createElement("style");
    externalWindow = null;

    componentDidMount() {
        // Open the new window
        this.style.textContent = `@tailwind base;  @tailwind components;  @tailwind utilities;`;
        this.externalWindow = window.open(
            "",
            "NewWindowComponent",
            "autoHideMenuBar = true,"
        );
        if (this.externalWindow) {
            this.externalWindow.document.body.appendChild(this.containerEl);
            this.externalWindow.document.head.appendChild(this.style);
            this.externalWindow.document.head.innerHTML =
                window.document.head.innerHTML;
            this.externalWindow.onunload = this.props.onClose; // Trigger onClose when the window is closed
        }
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}

export default NewWindowComponent;
