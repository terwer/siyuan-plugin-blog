/*
 * MIT License
 *
 * Copyright (c) 2023. Terwer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {Plugin, showMessage, confirm, Dialog, Menu} from "siyuan";
import "./index.styl";

export default class SiyuanBlog extends Plugin {
    onload() {
        console.log(this)

        // this.eventBus.on("ws-main", ({detail}: any) => {
        //     console.log("on ws-main", detail);
        // });
        //
        // const topBarElement = this.addTopBar({
        //     icon: "iconList",
        //     title: this.i18n.addTopBarIcon,
        //     position: "right",
        //     callback: () => {
        //         this.addMenu(topBarElement.getBoundingClientRect());
        //     }
        // });
    }

    onunload() {
        // console.log(this.i18n.byePlugin);
        // this.eventBus.off("ws-main", ({detail}: any) => {
        //     console.log(detail);
        // });
    }

    private addMenu(rect: DOMRect) {
        // const menu = new Menu("topBarSample", () => {
        //     console.log(this.i18n.byeMenu);
        // });
        // menu.addItem({
        //     label: "confirm",
        //     click() {
        //         confirm("Confirm", "Is this a confirm?", () => {
        //             console.log("confirm");
        //         }, () => {
        //             console.log("cancel");
        //         });
        //     }
        // });
        // menu.addItem({
        //     label: "showMessage",
        //     click: () => {
        //         showMessage(this.i18n.helloPlugin);
        //     }
        // });
        // menu.addItem({
        //     label: "Dialog",
        //     click: () => {
        //         new Dialog({
        //             title: "Info",
        //             content: '<div class="b3-dialog__content">This is a dialog</div>',
        //             width: "360px",
        //         });
        //     }
        // });
        // menu.addSeparator();
        // menu.addItem({
        //     label: "readonly",
        //     type: "readonly",
        // });
        // menu.open({
        //     x: rect.right,
        //     y: rect.bottom,
        //     isLeft: true,
        // });
    }
}