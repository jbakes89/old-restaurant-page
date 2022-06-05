export class TabbedPage {

    contentDiv;
    TAB_NAME;
    cached = false;

    constructor() {
    }

    buildContent() {
        this.contentDiv = document.createElement("div");
        this.contentDiv.classList.add("js-content-div");    
    }

    onClose() {
    }

    onOpen() {
    }

    fetchContent() {
        return this.contentDiv;
    }
}