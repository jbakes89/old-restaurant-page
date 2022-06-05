import { TabbedPage } from "./tabbed-page-template";

const menuImages = {}

const importAll = (r) => {
    r.keys().forEach((key) => (menuImages[key.replace("./", "")] = r(key)));
}
console.log("Importing all preview images for menu...")
importAll(require.context("./assets/menu/", false, /MENU-.*_prev\.svg/));

console.log(menuImages);

class MenuItem {
    imageIsCached = false;
    menuIsHidden = false;

    constructor(dishName, imageName) {
        this.dishName = dishName;
        this.imageName = imageName;
        this.stdImageURL = undefined;
        const preImagePath = menuImages[imageName + "_prev.svg"];
        this.preImageURL = `url(${preImagePath})`;
        // Preload preview images
        new Image().src = preImagePath;
    }

    // getStdImageURL(targetStyle, targetProperty) {
    //     if (!this.imageIsCached) {
    //         const path = `./assets/menu/${this.imageName}.jpg`;
    //         import(`./assets/menu/${this.imageName}.jpg`).then(function(module) {
    //             console.log(`Importing ${module.default}`)
    //             this.stdImageURL = `url(${module.default})`;
    //             console.log(`stdImageURL set as ${this.stdImageURL}`);
    //             // console.log(`Applying ${this.stdImageURL} to ${target}`);
    //             targetStyle[targetProperty] = this.stdImageURL;
    //             this.imageIsCached = true;
    //         }.bind(this));
    //     } else {
    //         targetStyle[targetProperty] = this.stdImageURL;
    //     }
    // }

    async getStdImageURL() {
        if (!this.imageIsCached) {
            const path = `./assets/menu/${this.imageName}.jpg`;
            await import(`./assets/menu/${this.imageName}.jpg`).then(function(module) {
                console.log(`Importing ${module.default}`)
                this.stdImageURL = `url(${module.default})`;
                this.imageIsCached = true;
            }.bind(this));
        }
        return this.stdImageURL;
    }

}

const MENU_ITEMS = [
    new MenuItem(
        "Prosciutto and Melon Cocktail",
        "MENU-prosciutto-melon"
    ),
    new MenuItem(
        "Poached Eggs and Avocado on Toast",
        "MENU-poached-eggs-toast"
    ),
    new MenuItem(
        "Carrot and Orange Salad",
        "MENU-carrot-orange"
    ),
    new MenuItem(
        "Laver-wrapper Cod on Herb Risotto",
        "MENU-cod-risotto"
    ),
    new MenuItem(
        "Stuffed Aubergine",
        "MENU-stuffed-aubergine"
    ),
    new MenuItem(
        "Sirloin Steak and Artichoke",
        "MENU-steak-artichoke"
    ),
    new MenuItem(
        "Lemon Curd Tart",
        "MENU-lemon-tart"
    )
];

console.log(MENU_ITEMS)

class MenuPage extends TabbedPage {

    TAB_NAME = "Menu";
    // currentItemIndex = 0;

    constructor() {
        super();
        this.buildContent();
    }

    // getCurrentItem() {
    //     return MENU_ITEMS[this.currentItemIndex];
    // }

    createContentElement() {
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("js-menu__wrapper");

        return contentDiv;
    }

    setBackgroundImage(itemIndex) {
        this.contentDiv.style.backgroundImage = MENU_ITEMS[itemIndex].preImageURL;
        MENU_ITEMS[itemIndex].getStdImageURL().then(function (url){
            this.contentDiv.style.backgroundImage = url;
        }.bind(this));
    }

    // Background image filling menu

    // Menu header
    createHeader() {
        const headerElement = document.createElement("h1");
        headerElement.classList.add("js-menu__header");

        headerElement.textContent = "Chef's Tasting Menu";

        return headerElement;
    }

    createMenuList() {
        const menuList = document.createElement("ol");
        menuList.classList.add("js-menu__list")
        
        // Fill menu
        MENU_ITEMS.forEach(item => {
            menuList.appendChild(this.createItemElement(item));
        }, this);

        return menuList;
    }

    createItemElement(item) {
        const itemElement = document.createElement("li");
        itemElement.classList.add("js-menu__item");
        itemElement.textContent = item.dishName;

        console.log(`itemElement is ${itemElement}`);

        itemElement.addEventListener("mouseover", this.onMouseoverOfMenuItem.bind(this));

        return itemElement;
    }

    onMouseoverOfMenuItem(ev) {
        console.log("mouseover event");

        // Get index of item in menu list
        const itemIndex = [].indexOf.call(ev.target.parentNode.children, ev.target);

        // Change background image
        this.setBackgroundImage(itemIndex);
    }

    onClickOfMenuItem(ev) {
        this.menuIsHidden ? this.showMenu() : this.hideMenu();
        this.menuIsHidden = !this.menuIsHidden;
    }

    showMenu() {
        const targetElements = this.contentDiv.querySelectorAll([".js-menu__header", "js-menu__list"]);
        
    }

    buildContent() {
        console.log

        this.contentDiv = this.createContentElement();

        this.contentDiv.appendChild(this.createHeader());
        this.contentDiv.appendChild(this.createMenuList());

        this.setBackgroundImage(0)
    }

    onClose() {
    }

    onOpen() {
    }
}

export const menuPage = new MenuPage();