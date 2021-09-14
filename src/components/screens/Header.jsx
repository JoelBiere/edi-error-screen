import NavigationBar from '../NavigationBar'
import { AlertSection, Alerts }  from '../Alerts'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cardsLoaded } from '../../actions/actions';
import { Button } from 'antd';


const Header = () => {

    const alertShown = useSelector(state => state.alertsReducer.isShown)
    const alertDetails = useSelector(state => state.alertsReducer.details)
    const dispatch = useDispatch()

    const handleClick= () => dispatch({
        type: 'RESET'
    })

    const loadData = () => dispatch(cardsLoaded())

    return (
        <React.Fragment>
            <AlertSection>


                {alertShown ?
                    <Alerts {...alertDetails} ></Alerts>
                    :
                    null}
            </AlertSection>
            <NavigationBar />
            <Button onClick={handleClick} type= 'danger'> reset state (dev only) </Button>
            <Button onClick={loadData} type='information'>Load data from API</Button>

        </React.Fragment>

    )
}


export default Header;

