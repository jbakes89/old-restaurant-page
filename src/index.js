import { homePage } from "./home.js";
import { menuPage } from "./menu.js";
import * as contactPage from "./contact.js";
import style from "./style.css";

console.log("This is index.js");

const TABBED_PAGES = [ homePage, menuPage ];
let currentPage = undefined;

const contentWrapper = document.querySelector("div#content-wrapper");

function main() {
    setupTabClickEvents();
    changePageTo(TABBED_PAGES[1]);
}

function changePageTo(newTabbedPage) {
    console.log("Opening new tab");
    contentWrapper.innerHTML = "";
    contentWrapper.append(newTabbedPage.fetchContent());
    const formerPage = currentPage;
    currentPage = newTabbedPage;
    console.log(`Current page is ${currentPage.TAB_NAME}`);
    if (formerPage) formerPage.onClose();
    currentPage.onOpen();
}

function setupTabClickEvents() {
    const onTabClick = (e) => {
        const targetPage = {
            "home-tab": homePage, "menu-tab": menuPage, "contact-tab": contactPage
        }[e.target.closest(".js-nav__tab").id];

        console.log(`Clicked on tab for ${targetPage.TAB_NAME}`);
        changePageTo(targetPage);
    };
    
    for (let tab of document.querySelectorAll(".js-nav__tab")) {
        console.log(`Adding event listener for ${tab}`);
        tab.addEventListener("click", onTabClick);
    }   
}

main();