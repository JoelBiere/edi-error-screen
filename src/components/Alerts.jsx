import { Alert, Button } from 'reactstrap'
import * as alerts from '../actions/alertTypes'
import store from '../store'
import { dismissAlert } from '../actions/actions'
import { generateDepartmentLabel } from './ErrorCards/ErrCard'
import styled from 'styled-components'

export const Alerts = (props) => {
   
    switch (props.alertType) {
        case (alerts.RESOLVED_ALERT):
            return <Alert color={props.color}> Error {props.id} marked as "Resolved" <CurrentTime /><CloseButton /></Alert>

        case (alerts.REASSIGNED_ALERT):
            return <Alert color={props.color}>Error {props.id} was reassigned from  {props.oldDepartment} to {props.newDepartment}  <CurrentTime /> <CloseButton /> </Alert>

        default:
            return null
    }
}

const CurrentTime = () =>{
    const now = new Date

     return now.toLocaleString()
}
const CloseButton = () => {
    const handleDismiss = () => {
        store.dispatch(dismissAlert())
    }
    return(
        <Button style={{backgroundColor: "Transparent", border: 'none'}} close onClick={handleDismiss}></Button>
    )
}

export const AlertSection = styled.div`
    font-size: larger;
    text-align: center;
    position: absolute;
    min-width: fit-content;
    z-index: 5;
    width: 300px;
    right: 0;
`


