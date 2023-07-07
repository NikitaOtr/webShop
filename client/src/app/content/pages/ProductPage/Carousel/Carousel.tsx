import { FC, useLayoutEffect, useState, useRef } from 'react';
import s from './Carousel.module.scss';

import { ButtonApp } from './../../../../components/ButtonApp/ButtonApp';
import { Comment } from './../Comment/Comment';

import imgArrowDown from './../../../../assets/staticImages/arrowDown.svg';
import { IComment } from './../../../../types/productTypes';
import { EnumModOpenComment } from './../ProductPage';

interface IProps {
    comments: Array<IComment>,
    openComment: (mod: EnumModOpenComment, comment: IComment, index: number) => void,
}

export const Carousel: FC<IProps> = ({ comments, openComment }) => {
    const [scrollSize, setScrollSize] = useState(310);
    const [commentWidth, setCommentWidth] = useState(300);
    const [carouselPosition, setCarouselPosition] = useState(0);
    const [countShowComments, setCuntShowComments] = useState(1);
    const [isShowLeftButton, setIsShowLeftButton] = useState(false);
    const [isShowRightButton, setIsShowRightButton] = useState(false);

    const refScrollBox = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        const workSpace = refScrollBox.current.clientWidth;
        const countShowComments = Math.floor(workSpace / 310);
        if (comments.length > countShowComments) {
            setIsShowRightButton(true);
        }
        const scrollSize = workSpace / countShowComments; 
        setCommentWidth(scrollSize - 10);
        setScrollSize(scrollSize);
        setCuntShowComments(countShowComments);
    }, [comments]);

    const onClickRotateToLeft = () => {
        const nextPosition = carouselPosition - 1;
        setCarouselPosition(nextPosition);
        setIsShowRightButton(true);
        if (!nextPosition) {
            setIsShowLeftButton(false);
        }

    };

    const onClickRotateToRight = () => {
        const nextPosition = carouselPosition + 1;
        setCarouselPosition(nextPosition);
        setIsShowLeftButton(true);
        if (nextPosition + countShowComments >= comments.length) {
            setIsShowRightButton(false);
        }
    };

    return (
        <div className={s.carousel}>
            {isShowLeftButton &&
                <ButtonApp className={`${s.carousel__button} ${s.carousel__button_left}`}
                        onClick={onClickRotateToLeft}>
                    <img className={`${s.carousel__img} ${s.carousel__img_left}`}
                         src={imgArrowDown} alt='img'/>
                </ButtonApp>
            }
            <div className={s.carousel__scrollBox} ref={refScrollBox}>
                <div className={s.carousel__scroll} style={{ marginLeft: (carouselPosition * (-scrollSize)) }}>
                    {comments.map((comment, index) => (
                        <Comment key={index} 
                                 comment={comment}
                                 width={commentWidth}
                                 index={index}
                                 openComment={openComment}/>
                    ))}
                </div>
            </div>
            {isShowRightButton &&
                <ButtonApp className={`${s.carousel__button} ${s.carousel__button_right}`}
                        onClick={onClickRotateToRight}>
                    <img className={`${s.carousel__img} ${s.carousel__img_right}`} 
                         src={imgArrowDown} alt='img'/>
                </ButtonApp>
            }
        </div>
    );
};