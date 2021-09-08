import NavigationBar from '../NavigationBar'
import { AlertSection, Alerts }  from '../Alerts'
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

const Header = () => {

    const alertShown = useSelector(state => state.alertsReducer.isShown)
    const alertDetails = useSelector(state => state.alertsReducer.details)

    return (
        <React.Fragment>
            <AlertSection>


                {alertShown ?
                    <Alerts {...alertDetails} ></Alerts>
                    :
                    null}
            </AlertSection>
            <NavigationBar />

        </React.Fragment>

    )
}


export default Header;

