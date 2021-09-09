import React, { useState } from 'react';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as department from '../ImcDepartments'
import store from '../store';
import { cardReassigned, cardReassignedAlert } from '../actions/actions'

const ReassignButton = (props) => {
    

    const handleReassign = (newDepartment) =>{
        store.dispatch(cardReassigned( newDepartment, props.errorID))
        store.dispatch(cardReassignedAlert(newDepartment, props.errorID, props.department))
    }

    const generateNotActiveDepartments = () => {
        let departments = {}
        Object.assign(departments, department)
        let otherDepartments = []
        for(let key in departments) {
            if(departments.hasOwnProperty(key)){
                if( department[key] !== props.department){
                    otherDepartments.push(department[key])
                }
            }
        }
        return otherDepartments.map(otherDepartment => <Menu.Item onClick={() => handleReassign(otherDepartment)} >{otherDepartment}</Menu.Item>)
    }

    const menu = (
        <Menu >
            <Menu.Item disabled> 
                {props.department}
            </Menu.Item>
            <Menu.Divider />
            {generateNotActiveDepartments()}
        </Menu>
    )

    return (

        <Dropdown overlay={menu} >
            <Button>
                Reassign to <DownOutlined /> 
            </Button>      
        </Dropdown>
        
    )

}

export default ReassignButton