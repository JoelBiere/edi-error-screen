import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { default as React, useState } from 'react';
import { Link } from "react-router-dom";




const NavigationBar = () => {

    const [current, setCurrent] = useState({ current: 'home' })

    const handleClick = e => {
        console.log('click', e);
        setCurrent({ current: e.key })
    }

    return (

        <Menu onClick={handleClick} selectedKeys={current.current} mode='horizontal' style={{ fontSize: "larger", marginBottom: "30px", background: "#F8F9FA", paddingTop: '20px' }}>

            <Menu.Item key="home" icon={<WarningOutlined />} >
                <Link to="/"> EDI 210 Errors </Link>
            </Menu.Item>
            
            <Menu.Item key="resolved" icon={<CheckCircleOutlined />} >
                <Link to="/resolved">Resolved Errors </Link>
            </Menu.Item>

        </Menu>



    )
}
export default NavigationBar;

