import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { cardsLoaded } from '../../actions/actions';
import store from '../../store';
import AlternateTabBar from '../AlternateTabBar';
import Footer from '../Footer';
import { useSelector } from 'react-redux';

const Body = () => {

    useEffect(() => store.dispatch(cardsLoaded()), [])

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