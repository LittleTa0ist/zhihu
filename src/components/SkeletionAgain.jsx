import React from 'react';
import { Skeleton } from 'antd-mobile';
const SkeletionAgain = () => {
    return <div className="SkeletionAgain_box">
        <Skeleton.Title />
        <Skeleton.Paragraph lineCount={5} animated />
    </div>;
}

export default SkeletionAgain;
