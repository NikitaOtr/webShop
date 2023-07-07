import imgArrowDown from './../assets/staticImages/arrowDown.svg';
import imgArrowUp from './../assets/staticImages/arrowUp.svg';
import imgBasket from './../assets/staticImages/basket.svg';
import imgBin from './../assets/staticImages/bin.svg';
import imgBook from './../assets/staticImages/book.svg';
import imgCross from './../assets/staticImages/cross.svg';
import imgDoubleArrow from './../assets/staticImages/doubleArrow.svg';
import imgEmptyHeart from './../assets/staticImages/emptyHeart.svg';
import imgEmptyStar from './../assets/staticImages/emptyStar.svg';
import imgEye from './../assets/staticImages/eye.svg';
import imgEyeCross from './../assets/staticImages/eyeCross.svg';
import imgFullHeart from './../assets/staticImages/fullHeart.svg';
import imgFullStar from './../assets/staticImages/fullStar.svg';
import imgHome from './../assets/staticImages/home.svg';
import imgLink from './../assets/staticImages/link.svg';
import imgPencil from './../assets/staticImages/pencil.svg';
import imgReset from './../assets/staticImages/reset.svg';
import imgUser from './../assets/staticImages/user.svg';

import imgBasketEmpty from './../assets/staticImagesHint/basketEmpty.avif';
import imgBasketThanks from './../assets/staticImagesHint/basketThanks.avif';
import imgCatalogEmpty from './../assets/staticImagesHint/catalogEmpty.avif';
import imgNotFound from './../assets/staticImagesHint/notFound.avif';

import { imagesBakes } from './../assets/imagesConst';

export function preloadImg() {
    const arrayImages = [
        imgArrowDown, imgArrowUp, imgBasket, imgBin, imgBook, imgCross, imgDoubleArrow, imgEmptyHeart, imgEmptyStar,
        imgEye, imgEyeCross, imgFullHeart, imgFullStar, imgHome, imgLink, imgPencil, imgReset, imgUser, imgBasketEmpty,
        imgBasketThanks, imgCatalogEmpty, imgNotFound, ...imagesBakes
    ];
    setTimeout(() => {
        arrayImages.forEach(image => {
            const img = new Image();
            img.src = image;
        });
    }, 100);
}