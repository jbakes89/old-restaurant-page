// Super
import { TabbedPage } from "./tabbed-page-template";
// Assets
import LOGO_URL from "./assets/logo.svg";
import BG_PREVIEW from "./assets/home/HOME-bg_prev.svg";

class Homepage extends TabbedPage {

    TAB_NAME = "Home";
    reviewAnimationInterval;
    bgImageCached = false;

    // Text content
    DESCRIPTION_TEXT = "An elegant, refined, French dining experience";

    constructor() {
        super();
        this.buildContent();
    }

    createContentElement() {
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("js-home__wrapper")

        return contentDiv;
    }

    createTitleElement() {
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("js-home__title-wrapper");

        const logo = document.createElement("img");
        logo.src = LOGO_URL;
        logo.classList.add("js-home__logo");

        titleDiv.appendChild(logo);

        return titleDiv;
    }

    createDescriptionElement() {
        console.log(`Creating Home description element...`)
        const descriptionDiv = document.createElement("p");
        descriptionDiv.classList.add("js-home__description");

        console.log(`Intended text is ${this.DESCRIPTION_TEXT}`);

        descriptionDiv.textContent = this.DESCRIPTION_TEXT;

        console.log(`Actual text is ${descriptionDiv.textContent}`);


        return descriptionDiv;
    }

    createReviewsWrapper() {
        const reviewsWrapper = document.createElement("div");
        reviewsWrapper.classList.add("js-home__reviews-wrapper");

        reviewsWrapper.appendChild(this.createReviewReel());

        return reviewsWrapper;
    }

    createReviewReel() {
        const reviewReel = document.createElement("ol");
        reviewReel.classList.add("js-reviews__reel");

        this.fillReviews(reviewReel, 10);

        return reviewReel;
    }

    slideAnimation() {
        const reviewReel = document.querySelector(".js-reviews__reel")
        reviewReel.addEventListener("transitionend", (e) => {
            const reel = e.target;
            const firstChild = reel.removeChild(reel.firstElementChild);
            reel.appendChild(firstChild);
            reel.classList.remove("js-reviews__reel--slide");
        }, { once: true });
        reviewReel.classList.add("js-reviews__reel--slide");
    }

    startReviewAnimation() {
        this.reviewAnimationInterval = setInterval(this.slideAnimation, 5000);
    }

    stopReviewAnimation() {
        if (this.reviewAnimationInterval != undefined) {
            this.reviewAnimationInterval = clearInterval(this.reviewAnimationInterval);
        }
    }

    fillReviews(reviewReel, testSize = -1) {
        // const reviews = [
        //     {author: "The Old Yorker", message: "An... experience!"},
        //     {author: "Mitch Allan", message: "Exquisite, delicious, divine. One star."}
        // ]

        const reviews = [];

        while (reviews.length < testSize) {
            reviews.push({
                author: `Author #${reviews.length + 1}`,
                message: `Message #${reviews.length + 1}`
            });
        }
        
        reviews.forEach(review => {
            reviewReel.appendChild(this.createReviewElement(review.message, review.author));
        });
    }

    createReviewElement(message, author) {
        const reviewElement = document.createElement("li");
        reviewElement.classList.add("js-reviews__individual-wrapper")

        const reviewMessageElement = document.createElement("p");
        reviewMessageElement.textContent = message;
        reviewMessageElement.classList.add("js-reviews__message");
        
        const reviewAuthorElement = document.createElement("p");
        reviewAuthorElement.textContent = `~ ${author} ~`;
        reviewAuthorElement.classList.add("js-reviews__author");

        reviewElement.appendChild(reviewMessageElement);
        reviewElement.appendChild(reviewAuthorElement);

        return reviewElement;
    }

    buildContent() {
        console.log(`Building content for home.js`);

        this.contentDiv = this.createContentElement();

        this.contentDiv.appendChild(this.createTitleElement());
        this.contentDiv.appendChild(this.createDescriptionElement());

        const reviewsWrapper = this.createReviewsWrapper();
        this.contentDiv.appendChild(reviewsWrapper);

        // Set background image
        this.contentDiv.style.backgroundImage = `url(${BG_PREVIEW})`;
    }

    onClose() {
        this.stopReviewAnimation();
    }

    onOpen() {
        this.startReviewAnimation();
        if (!this.bgImageCached) {
            import("./assets/home/HOME-bg.jpg").then(function(module) {
                console.log(`Imported ${module.default}`);
                this.contentDiv.style.backgroundImage = `url(${module.default})`;
            }.bind(this));
            this.bgImageCached = true;
        }
    }
}

export const homePage = new Homepage();