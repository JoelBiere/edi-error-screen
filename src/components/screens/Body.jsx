import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { cardsLoaded } from '../../actions/actions';
import AlternateTabBar from '../AlternateTabBar';
import Footer from '../Footer';


const Body = () => {

    let errCardsShowing = useSelector(state => state.cardsReducer.errCardsShowing);
    
    return (
        <Container fluid={true}>

            <Row>
                    <AlternateTabBar {...errCardsShowing}></AlternateTabBar> 
            </Row>
        
            <Row>
                <Footer>
                    this is the footer
                </Footer>
            </Row>
        </Container>

    )
}

export default Body;