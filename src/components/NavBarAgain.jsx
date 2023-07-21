import React from 'react';
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile';
import './NavBarAgain.less'
const NavBarAgain = (props) => {
    let { title } = props
    const handleBack = () => {

    }
    return <NavBar onBack={handleBack}>
        {title}
    </NavBar>;
}
NavBarAgain.defaultProps = {
    title: '个人中心'
}
NavBarAgain.propTypes = {
    title: PropTypes.string
}

export default NavBarAgain;
