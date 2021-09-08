import React, { useState } from 'react';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as department from '../ImcDepartments'
import store from '../store';
import { cardReassigned, cardReassignedAlert } from '../actions/actions'

const ReassignButton = (props) => {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    
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
        return otherDepartments.map(otherDepartment => <DropdownItem onClick={() => handleReassign(otherDepartment)} >{otherDepartment}</DropdownItem>)
    }

    return (

        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} color="secondary">
            <DropdownToggle caret> Reassign to </DropdownToggle>
            <DropdownMenu>
                <DropdownItem disabled> {props.department} </DropdownItem>
                {generateNotActiveDepartments()}
                
            </DropdownMenu>
        </ButtonDropdown>
        
    )

}

export default ReassignButton