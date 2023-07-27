import React from 'react'
import './NewsItem.less'
import { Image } from 'antd-mobile'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function NewsItem(props) {
    let { info, info: { images, title, hint, id, image } } = props
    if (!images) images = [image]
    if (!info) return null
    if (!Array.isArray(images)) images = ['']
    return (
        <div className='NewsItem_box'>
            <Link to={{ pathname: `/detail/${id}` }}>
                <Image src={images[0]} lazy />
                <div className="content">
                    <h4 className="title">
                        {title}
                    </h4>
                    <p className="author">
                        {hint}
                    </p>
                </div>
            </Link>

        </div>
    )
}

NewsItem.defaultProps = {
    info: null
}

NewsItem.propTypes = {
    info: PropTypes.object
}