import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { cardSelected, detailsToggled } from '../../actions/actions'
import { Badge, Tag } from 'antd'
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
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



    

    return (
        <div className={selectedCardID === props.errorID ? 'selected' : 'unselected'} onClick={handleCardSelect}>

            <DepartmentSection style={{marginLeft: "0"}}>
                {generateDepartmentRibbon(props.department)}
            </DepartmentSection>

            <Date>
                {props.errorDate.toDateString()}
            </Date>

            <ErrID style={{ color: 'black' }}>
                Error {props.errorID}
            </ErrID>

            <Status>
            {
                props.isResolved ?
                    <Tag color="success" icon={<CheckCircleOutlined />}>Resolved</Tag>

                : props.markedResolved ?
                    <Tag color="processing" icon={<SyncOutlined spin />}>validating</Tag>

                :
                    <Tag color="error" icon={<CloseCircleOutlined />}> Unresolved</Tag>


            }
            </Status>
            <CompanyLabel>
                {props.customer}
            </CompanyLabel>

            <Price>
                $ {props.price}
            </Price>

        </div>

    )

}

export const generateDepartmentRibbon = (department) => {
    switch (department) {
        case ("Operations"):
            return <Badge.Ribbon  placement= "start" text="Operations"> </Badge.Ribbon>

        case ("EDI Team"):
            return <Badge.Ribbon  placement= "start" color="purple" text="EDI Team"> </Badge.Ribbon>

        case ("Accounting"):
            return <Badge.Ribbon  placement= "start" color="cyan" text="Accounting"> </Badge.Ribbon>

        default:
            return <DepartmentLabel> {department} </DepartmentLabel>
    }
}

const DepartmentSection = styled.div`
    grid-area: dptLabel;

`
const DepartmentLabel = styled.span`
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
const Status = styled.div`
    grid-area: status;
`
const Price = styled.div`
    grid-area: price;
    color: #e63946;
`
// export const Resolved = styled.div`
//     background: #5cb85c;
//     font-family: serif;
//     color: #fdfdfd;
//     opacity: 70%;
//     text-align: center;
//     grid-area: err;
//     width: 100%;
// `
// export const MarkedResolved = styled.div`
//     background: #1e85da;
//     font-family: serif;
//     color: #fdfdfd;
//     opacity: 70%;
//     text-align: center;
//     grid-area: err;
//     width: 100%;
// `

const CompanyLabel = styled.div`
    grid-area: company;

`
export default ErrCard