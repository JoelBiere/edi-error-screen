import { useDispatch } from 'react-redux'
import { Alert, Button } from 'reactstrap'
import styled from 'styled-components'
import { dismissAlert } from '../actions/actions'
import * as alerts from '../actions/alertTypes'
import { generateDepartmentLabel } from '../utility/generateComponents'


export const Alerts = (props) => {
   
    switch (props.alertType) {
        case (alerts.RESOLVED_ALERT):
            return <Alert color="dark"> Error {props.id} marked as "Resolved" <CurrentTime /><CloseButton /></Alert>

        case (alerts.REASSIGNED_ALERT):
            return <Alert color="dark">Error {props.id} was reassigned from  {generateDepartmentLabel(props.oldDepartment)} to {generateDepartmentLabel(props.newDepartment)}  <CurrentTime /> <CloseButton /> </Alert>

        default:
            return null
    }
}

const CurrentTime = () =>{
    

    const now = new Date

     return now.toLocaleString()
}
const CloseButton = () => {
    const dispatch = useDispatch()
    const handleDismiss = () => {
        dispatch(dismissAlert())
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


