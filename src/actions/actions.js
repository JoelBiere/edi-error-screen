import * as actions from './actionTypes'
import * as alerts from './alertTypes'
import data from '../dummyData'

//THIS IS WHERE THE API CALL WOULD BE MADE FOR DATA--REPLACE 'data' with the API DATA

let serverData = data

export const cardsLoaded = () => {
    return {
        type: actions.CARDS_LOADED,
        payload: serverData
    }
}


export const cardSelected = (id) => {
    return {
        type: actions.CARD_SELECTED,
        payload: {
            cardChosenID: id 
        }
        
    }
}

export const detailsToggled= () => {
    return {
        type: actions.DETAILS_TOGGLED
    }
}

export const cardReassigned = (department, id) => {
    //AXIOS PUT REQUEEST--CHANGE DEPARTMENT
    
    return {
        type: actions.CARD_REASSIGNED,
        payload: {
            idOfToReassign: id,
            newDepartment: department
        }
    }
}

export const cardMarkedResolved = (id, location) => {
 //AXIOS PUT REQUEST-- CHANGE markedResolved
 
    return {
        type: actions.CARD_RESOLVED,
        payload: {
            idOfResolved: id,
            location: location
        }
    }
}

export const operatingCompanyChanged = (operatingCompany) => {

    return {
        type: actions.OPERATING_COMPANY_CHANGED,
        payload: {
            operatingCompany
        }
    }
}

export const showResolvedToggled = (checked) => {

    return {
        type: actions.SHOW_RESOLVED_TOGGLED,
        payload: {
            checked
        }
    }
} 



//sorting Actions

export const sortedByDepartment = () => {

    return {
        type: actions.SORTED_BY_DEPARTMENT
    }
}

export const sortedByErrorID = () => {

    return {
        type: actions.SORTED_BY_ERRORID
    }
}

export const sortedByInvoiceAmount = () => {

    return {
        type: actions.SORTED_BY_INVOICEAMOUNT
    }
}

export const sortedByMostRecent = () => {
    return {
        type: actions.SORTED_BY_MOST_RECENT
    }
}

export const sortedByLeastRecent = () => {
    return {
        type: actions.SORTED_BY_LEAST_RECENT
    }
}

export const sortedByClient = () => {
    return{
        type: actions.SORTED_BY_CLIENT
    }
}
//alerts
export const dismissAlert = () => {
    return{
        type: actions.dismiss_alert
    }
}

export const cardResolvedAlert = (id) => {
    return{
        type: actions.card_resolved_alert,
        payload: {
            id,
            alertType: alerts.RESOLVED_ALERT,
            color: "success"
        }
    }
}

export const cardReassignedAlert = (newDepartment, id, oldDepartment) => {
    return{
        type: actions.card_reassigned_alert,
        payload: {
            id,
            alertType: alerts.REASSIGNED_ALERT,
            newDepartment,
            oldDepartment,
            color: "warning"
        }
    }
}