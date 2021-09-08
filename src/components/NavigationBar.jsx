import { default as React, useState } from 'react';
import {
    BrowserRouter as Router, Route, Switch, Link
} from "react-router-dom";

import { Menu } from 'antd'
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons'
import Body from './screens/Body';
import Resolved from './screens/Resolved';
import 'antd/dist/antd.css'; 



const NavigationBar = () => {

    const [current, setCurrent] = useState({ current: 'home' })

    const handleClick = e => {
        console.log('click', e);
        setCurrent({ current: e.key })
    }

    return (
        <Router>
            <Menu onClick={handleClick} selectedKeys={current.current} mode='horizontal' style={{fontSize:"larger", marginBottom:"30px", background:"#F8F9FA", paddingTop: '20px'}}>

                <Menu.Item key="home" icon={<WarningOutlined />} >
                    <Link to="/"> EDI 210 Errors </Link>
                </Menu.Item>

                

                <Menu.Item key="resolved" icon={<CheckCircleOutlined />} >
                    <Link to="/resolved">Resolved Errors </Link>
                </Menu.Item>

            </Menu>

            <Switch>
                <Route path="/resolved">
                    <Resolved />
                </Route>
                <Route path="/">
                    <Body />
                </Route>
            </Switch>
        </Router>
    )
}
export default NavigationBar;

