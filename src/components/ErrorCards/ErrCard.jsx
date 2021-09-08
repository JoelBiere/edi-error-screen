import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { cardSelected, detailsToggled } from '../../actions/actions'
import store from '../../store'
import './ErrCard.css'

const ErrCard = (props) => {

    const detailsRequested = useSelector(state => state.cardsReducer.detailsShown)

    const handleCardSelect = () => {
        store.dispatch(cardSelected(props.errorID))
        if (!detailsRequested) {
            store.dispatch(detailsToggled())
        }

    }

    const selectedCardID = useSelector(state => state.cardsReducer.cardChosenID)

    const isResolved = props.isResolved



    return (
        <div className={selectedCardID === props.errorID ? 'selected' : 'unselected'} onClick={handleCardSelect}>
            
            <DepartmentSection>
                {generateDepartmentLabel(props.department)}
            </DepartmentSection>

            <Date>
                {props.errorDate.toDateString()}
            </Date>
            {
                isResolved ?
                    <Resolved>
                        <ErrID style={{color:'black'}}>
                            Error {props.errorID}
                        </ErrID>
                        Resolved
                    </Resolved>
                    :
                    <ErrID>
                        Error {props.errorID}
                    </ErrID>
            }

            <CompanyLabel>
                {props.customer}
            </CompanyLabel>

            <Price>
                 $ {props.price}
            </Price>

        </div>

    )

}

export const generateDepartmentLabel = (department) => {
    switch (department) {
        case ("Operations"):
            return <DepartmentLabel style={{ background: "#ce6b1a" }}>Operations</DepartmentLabel>
        case ("EDI Team"):
            return <DepartmentLabel style={{ background: "#1d3557" }}>EDI Team</DepartmentLabel>
        case ("Accounting"):
            return <DepartmentLabel style={{ background: "#e63946" }}>Accounting</DepartmentLabel>
        default:
            return <DepartmentLabel> {department} </DepartmentLabel>
    }

}

const DepartmentSection = styled.div`
    grid-area: dptLabel;

`
const DepartmentLabel = styled.div`
    background: #e76f51;
    margin-left: 0px;
    margin-top: 0px;
    padding: 4px;
    border: 2px solid black;
    color: white;
    
`
const ErrID = styled.div`
    grid-area: err;
    font-size: large;
`
const Date = styled.div`
    grid-area: date;
    
`

const Price = styled.div`
    grid-area: price;
    color: #e63946;
`
export const Resolved = styled.div`
    background: #5cb85c;
    font-family: serif;
    color: #fdfdfd;
    opacity: 70%;
    text-align: center;
    grid-area: err;
    width: 100%;
`
const CompanyLabel = styled.div`
    grid-area: company;

`
export default ErrCard