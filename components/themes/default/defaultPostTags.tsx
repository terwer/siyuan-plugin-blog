import tagStyles from "./css/tag.module.css"

export default function DefaultPostTags({tagstr}: { tagstr: string }) {
    const tags = tagstr.split(",")
    const colors = ["#cce7e0", "#dbdcf4", "#fcf4cc", "#fbd2d4"]

    return (
        <div className={tagStyles.tagBox}>
            {
                tags.map((tag) => {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];

                    return <Tag key={tag} color={randomColor} closable={false}>
                        {tag}
                    </Tag>
                })
            }
        </div>
    )
}

/**
 *
 *  color: 设置标签颜色
 *  visible: 标签是否显示  true
 *  closable： 标签是否可以关闭（点击默认关闭） false
 *  onClose: 关闭会调
 *  icon: Icon
 */
import React, {useState} from 'react';
import classnames from 'classnames';

interface IPropsTag {
    color?: string;
    visbile?: boolean;
    closable?: boolean;
    onClose?: () => void;
    icon?: React.ReactNode;
    children?: any
}

export const Tag: React.FC<IPropsTag> = (props) => {

    const {color, visbile = true, closable = false, onClose, icon} = props;

    const [showTag, setShowTag] = useState(visbile);

    const handleClose = () => {
        onClose && onClose();
        setShowTag(false);
    };

    return (
        <div
            className={classnames(tagStyles.OwnTag, color ? tagStyles.hasuserColor : '')}
            style={{
                display: !showTag ? 'none' : 'visible',
                color: '#333333',
                backgroundColor: color,
            }}
        >
            {icon && <span style={{marginRight: 4}}>{icon}</span>}
            <span className={tagStyles.TagTextOwn}>{props.children}</span>
            {closable && (
                <span className={tagStyles.closeBtn} onClick={handleClose}>
          x
        </span>
            )}
        </div>
    );
};
