import { FC, MouseEvent } from 'react';
import s from './Comment.module.scss';

import { useAppSelector } from './../../../../hooks/useAppSelector';

import { ReactComponent as ImgPencil } from './../../../../assets/staticImages/pencil.svg';
import imgEmptyStar from './../../../../assets/staticImages/emptyStar.svg';
import imgFullStar from './../../../../assets/staticImages/fullStar.svg';
import { IComment } from './../../../../types/productTypes';
import { EnumModOpenComment } from './../ProductPage';

interface IProps {
    comment: IComment,
    index:number
    width: number,
    openComment: (mod: EnumModOpenComment, comment: IComment, index: number) => void
}

export const Comment: FC<IProps> = ({ comment, width, openComment, index }) => {
    const user = useAppSelector(state => state.ReducerUser.user);

    const fullStarArray = new Array(comment.rating).fill(0);
    const emptyStarArray = new Array(5 - comment.rating).fill(0);

    const onClickOpenChange = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        openComment(EnumModOpenComment.change, comment, index);
    }

    const isShowChange = comment.user.email === user?.email

    return (
        <div className={s.comment} 
             style={{ maxWidth: width, minWidth: width }}
             onClick={() => openComment(EnumModOpenComment.view, comment, index)}>
            <div className={s.comment__title}>
                <div className={s.comment__titleBox}>
                    <div className={s.comment__title__name}>{comment.user.displayName}</div>
                    <div className={s.comment__title__date}>{comment.date}</div>
                </div>
                { isShowChange &&
                    <div className={s.boxPencil} onClick={onClickOpenChange}>
                        <ImgPencil className={s.boxPencil__pencil} title='Редактировать'/>
                    </div>
                }
            </div>
            <div className={s.comment__rating} title={`${comment.rating} из 5`}>
                {fullStarArray.map((_, i) => (
                    <img className={s.comment__rating__star} key={i} src={imgFullStar} alt='img'/>
                ))}
                {emptyStarArray.map((_, i) => (
                    <img className={s.comment__rating__star} key={i} src={imgEmptyStar} alt='img'/>
                ))}
            </div>
            <div className={s.comment__text}>{comment.comment}</div>
        </div>
    );
};