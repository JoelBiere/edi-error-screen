import { useLocation } from 'react-router-dom'
import * as actions from '../actions/actionTypes'
import * as imcc from '../actions/imcOperatingCompanies'

const initialState = {
    errData: [],
    operatingCompany: imcc.ALL,
    errCardsShowing: [],
    includeResolved: false,
    displayedCard: {},
    cardChosenID: undefined,
    resolvedCards: [],
    markedResolvedCards: [],
    detailsShown: false,
    sortedBy: {
        department: false,
        mostRecent: false,
        leastRecent: false,
        errID: false,
        client: false,
        invoiceAmount: false
    }
}

export function cardsReducer(state = initialState, action) {
    switch (action.type) {
        case (actions.CARDS_LOADED):
            return {
                ...state,
                errData: action.payload,
                resolvedCards: action.payload.filter(obj => obj.isResolved),
                errCardsShowing: action.payload.filter(obj => !obj.isResolved)
            }
        case (actions.CARD_SELECTED):
            return {
                ...state,
                displayedCard: state.errData.find(obj => obj.errorID === action.payload.cardChosenID),
                cardChosenID: action.payload.cardChosenID
            }
        case (actions.CARD_REASSIGNED):
            return {
                ...state,
                errData: state.errData.map(obj => obj.errorID !== action.payload.idOfToReassign ? obj : { ...obj, department: action.payload.newDepartment }),
                displayedCard: { ...state.displayedCard, department: action.payload.newDepartment },
                errCardsShowing: state.errCardsShowing.map(obj => obj.errorID !== action.payload.idOfToReassign ? obj : { ...obj, department: action.payload.newDepartment })
            }

        case (actions.DETAILS_TOGGLED):
            return {
                ...state,
                detailsShown: !state.detailsShown
            }

        case (actions.CARD_RESOLVED):

            let updatedSet = state.errData.map(obj => obj.errorID !== action.payload.idOfResolved ? obj : { ...obj, markedResolved: true })

            let showingCards;
            let displayedCard;
           
            if (state.includeResolved || ( action.payload.location && action.payload.location.pathname.slice(0, 8) === '/history/')) {
                showingCards = state.errCardsShowing.map(obj => obj.errorID !== action.payload.idOfResolved ? obj : { ...obj, markedResolved: true })
                displayedCard = { ...state.displayedCard, markedResolved: true }
            } else if (!state.includeResolved) {
                showingCards = state.errCardsShowing.filter(obj => obj.errorID !== action.payload.idOfResolved)
                displayedCard = undefined
            }

            return {
                ...state,
                markedResolvedCards: [...state.resolvedCards, updatedSet.find(obj => obj.errorID === action.payload.idOfResolved)],
                errData: updatedSet,
                displayedCard: displayedCard,
                detailsShown: state.includeResolved ? true : false,
                errCardsShowing: showingCards
            }

        case (actions.OPERATING_COMPANY_CHANGED):
            let shownCards;

            if (action.payload.operatingCompany !== imcc.ALL) {
                if (state.includeResolved) {
                    shownCards = state.errData.filter(obj => obj.imcCompany === action.payload.operatingCompany)
                } else {
                    shownCards = state.errData.filter(obj => obj.imcCompany === action.payload.operatingCompany && !obj.isResolved && !obj.markedResolved)
                }

            } else if (state.includeResolved) {
                shownCards = state.errData
            } else {
                shownCards = state.errData.filter(obj => !obj.isResolved && !obj.markedResolved)
            }

            return {
                ...state,
                errCardsShowing: shownCards,
                operatingCompany: action.payload.operatingCompany,
                cardChosenID: undefined,
                displayedCard: {},
                detailsShown: false,
                sortedBy: initialState.sortedBy
            }

        case (actions.SHOW_RESOLVED_TOGGLED):

            let cardsShowing;

            if (action.payload.checked) {
                if (state.operatingCompany === imcc.ALL) {
                    cardsShowing = state.errData
                } else {
                    cardsShowing = state.errData.filter(obj => obj.imcCompany === state.operatingCompany)
                }

            } else if (!action.payload.checked && state.operatingCompany === imcc.ALL) {
                cardsShowing = state.errData.filter(obj => !obj.isResolved && !obj.markedResolved)
            } else if (!action.payload.checked) {
                cardsShowing = state.errData.filter(obj => !obj.isResolved && !obj.markedResolved && obj.imcCompany === state.operatingCompany)
            }


            return {
                ...state,
                includeResolved: action.payload.checked,
                errCardsShowing: cardsShowing,
                sortedBy: {...state.initialState}
            }

        //Sorting cases
        case (actions.SORTED_BY_DEPARTMENT):
            const sortedByDepartment = state.errCardsShowing.sort((a, b) => a.department > b.department ? 1 : a.department < b.department ? -1 : 0)

            return {
                ...state,
                errCardsShowing: sortedByDepartment.filter(obj => obj === obj),
                sortedBy: { ...initialState.sortedBy, department: true }
            }

        case (actions.SORTED_BY_ERRORID):
            const sortedByErrorID = state.errCardsShowing.sort((a, b) => a.errorID > b.errorID ? 1 : a.errorID < b.errorID ? -1 : 0)
            return {
                ...state,
                errCardsShowing: sortedByErrorID.filter(obj => obj === obj),
                sortedBy: { ...initialState.sortedBy, errID: true }
            }

        case (actions.SORTED_BY_INVOICEAMOUNT):
            const sortedByInvoiceAmount = state.errCardsShowing.sort((a, b) => a.price < b.price ? 1 : a.price > b.price ? -1 : 0)
            return {
                ...state,
                errCardsShowing: sortedByInvoiceAmount.filter(obj => obj === obj),
                sortedBy: { ...initialState.sortedBy, invoiceAmount: true }
            }
        case (actions.SORTED_BY_MOST_RECENT):
            const sortedByMostRecent = state.errCardsShowing.sort((a, b) => a.errorDate < b.errorDate ? 1 : a.errorDate > b.errorDate ? -1 : 0)
            return {
                ...state,
                sortedBy: { ...initialState.sortedBy, mostRecent: true },
                errCardsShowing: sortedByMostRecent.filter(obj => obj === obj)
            }

        case (actions.SORTED_BY_LEAST_RECENT):
            const sortedByLeastRecent = state.errCardsShowing.sort((a, b) => a.errorDate > b.errorDate ? 1 : a.errorDate < b.errorDate ? -1 : 0)
            return {
                ...state,
                sortedBy: { ...initialState.sortedBy, leastRecent: true },
                errCardsShowing: sortedByLeastRecent.filter(obj => obj === obj)
            }

        case (actions.SORTED_BY_CLIENT):
            const sortedByClient = state.errCardsShowing.sort((a, b) => a.customer > b.customer ? 1 : a.customer < b.customer ? -1 : 0)
            return {
                ...state,
                sortedBy: { ...initialState.sortedBy, client: true },
                errCardsShowing: sortedByClient.filter(obj => obj === obj)
            }
            
        default:
            return state;
    }


}


let alertsInitialState = {
    isShown: false,
    details: {}
}
export function alertsReducer(state = alertsInitialState, action) {
    switch (action.type) {
        case (actions.card_resolved_alert):
            return {
                ...state,
                isShown: true,
                details: {
                    ...state.details,
                    id: action.payload.id,
                    alertType: action.payload.alertType,
                    color: action.payload.color
                }
            }

        case (actions.dismiss_alert):
            return {
                ...state,
                isShown: false
            }

        case (actions.card_reassigned_alert):
            return {
                ...state,
                isShown: true,
                details: {
                    ...state.details,
                    alertType: action.payload.alertType,
                    id: action.payload.id,
                    newDepartment: action.payload.newDepartment,
                    oldDepartment: action.payload.oldDepartment,
                    color: action.payload.color
                }
            }

        default:
            return state
    }

}