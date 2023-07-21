import React from 'react';
import { Skeleton } from 'antd-mobile';
import './SkeletionAgain.less'
const SkeletionAgain = () => {
    return <div className="SkeletionAgain_box">
        <Skeleton.Title />
        <Skeleton.Paragraph lineCount={5} animated />
    </div>;
}

export default SkeletionAgain;
