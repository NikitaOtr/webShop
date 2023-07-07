import { FC, useState, ChangeEvent } from 'react';
import s from './CommentPopup.module.scss';

import { WrapperPopup } from './../../../../components/WrapperPopup/WrapperPopup';
import { ButtonApp } from './../../../../components/ButtonApp/ButtonApp';

import { useAppSelector } from './../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../hooks/useAppAction';

import { ReactComponent as ImgCross } from './../../../../assets/staticImages/cross.svg';
import { checkIsValidLength } from './../../../../utils/checkIsValidLength';
import imgEmptyStar from './../../../../assets/staticImages/emptyStar.svg';
import imgFullStar from './../../../../assets/staticImages/fullStar.svg';
import { IComment } from './../../../../types/productTypes';
import { EnumModOpenComment } from './../ProductPage';

interface IProps {
    productName: string,
    closePopup: () => void,
    index?: number
    comment?: IComment,
    mod: EnumModOpenComment,
}

export const CommentPopup: FC<IProps> = ({ productName, closePopup, comment, index, mod }) => {
    const user = useAppSelector(state => state.ReducerUser.user);

    const { addReviewProduct, deleteReviewProduct, changeReviewProduct } = useAppActions();

    const [textareaValue, setTextareaValue] = useState(comment?.comment || '');
    const [rating, setRating] = useState(comment?.rating || 0);
    const [showRating, setShowRating] = useState(comment?.rating || 0);
    const [isValidRating, setIsValidRating] = useState(true);
    const [isValidTextareaValue, setIsValidTextareaValue] = useState(true);

    const arrayFullStars = new Array(showRating).fill(0);
    const arrayEmptyStars = new Array(5 - showRating).fill(0);

    const onClickSend = () => {
        const isValidRating = rating > 0;
        const isValidTextareaValue = checkIsValidLength(textareaValue, 10);

        if (isValidRating && isValidTextareaValue) {
            if (mod === EnumModOpenComment.create) {
                addReviewProduct({comment: textareaValue, rating, user});
            } else {
                changeReviewProduct({index, comment: textareaValue, rating});
            }
            closePopup();
        } else {
            setIsValidRating(isValidRating);
            setIsValidTextareaValue(isValidTextareaValue);
        }
    };

    const onClickDelete = () => {
        deleteReviewProduct({comment, index})
        closePopup();
    };

    const onChangeTextareaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value);
        setIsValidTextareaValue(true);
    };

    return (
        <WrapperPopup closePopup={closePopup} classContent={s.commentPopup}>
            <>
                <div className={s.boxCross} onClick={closePopup}>
                    <ImgCross className={s.boxCross__cross}/>
                </div>
                <div className={s.commentPopup__title}>Отзыв о {productName}</div>
                {mod === EnumModOpenComment.view &&
                    <div className={s.author}>
                        <div className={s.commentData__title}>Автор: {comment.user.displayName}</div>
                        <div className={s.author__date}>{comment.date}</div>
                    </div>
                }
                <div className={s.commentData}>
                    <div className={s.commentData__title}>{mod === EnumModOpenComment.view ? 'Оценка товара' : 'Оцените товар'}</div>
                    <div className={s.commentData__stars} 
                         title={`${showRating} из 5`}
                         onMouseLeave={() => setShowRating(rating)}>
                        {arrayFullStars.map((_, index) => (
                            <img className={`${s.commentData__star} ${mod !== EnumModOpenComment.view ? s.commentData__star_changeMode : ''}`}
                                 src={imgFullStar}
                                 key={index} 
                                 alt='img'
                                 onMouseEnter={() => mod !== EnumModOpenComment.view && setShowRating(index + 1)}
                                 onClick={() => {
                                    if (mod !== EnumModOpenComment.view) {
                                        setShowRating(index + 1);
                                        setRating(index + 1);
                                        setIsValidRating(true);
                                    }
                                }}/>
                        ))}
                        {arrayEmptyStars.map((_, index) => (
                            <img className={s.commentData__star}
                                 src={imgEmptyStar} 
                                 key={index} 
                                 alt='img' 
                                 onMouseEnter={() => mod !== EnumModOpenComment.view &&  setShowRating(showRating + index + 1)}/>
                        ))}
                    </div>
                    <div className={`${s.commentData__error} ${isValidRating ? s.inactive : s.active}`}>
                        Выберете оценку
                    </div>
                </div>
                <div className={s.commentData}>
                    <div className={s.commentData__title}>
                        {mod === EnumModOpenComment.view ? 'Комментарий к оценке' : 'Расскажите о товаре'}
                    </div>
                    <textarea className={`${s.commentData__textarea} ${!isValidTextareaValue ? s.commentData__textarea_error : ''}`}
                              onChange={onChangeTextareaValue}
                              disabled={mod === EnumModOpenComment.view}
                              value={textareaValue}>
                    </textarea>
                    <div className={`${s.commentData__error} ${isValidTextareaValue ? s.inactive : s.active}`}>
                        Комментарий должен быть более 9 символов
                    </div>
                </div>
                {mod !== EnumModOpenComment.view &&
                    <div className={s.boxButtons}> 
                        <ButtonApp className={s.boxButtons__button} onClick={onClickSend}>
                            {mod === EnumModOpenComment.create ? 'Отправить' : 'Сохранить'}
                        </ButtonApp>
                        {mod === EnumModOpenComment.change && 
                            <ButtonApp className={s.boxButtons__button} onClick={onClickDelete}>
                                Удалить
                            </ButtonApp>
                        }
                    </div>
                }
            </>
        </WrapperPopup>
    );
};