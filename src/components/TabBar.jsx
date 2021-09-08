import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import classnames from 'classnames'
import ErrCard from '../components/ErrorCards/ErrCard';
import ErrPane from './screens/ErrPane';
import store from '../store';
import * as imcc from '../actions/imcOperatingCompanies'
import { detailsToggled, operatingCompanyChanged } from '../actions/actions';
import './TabBarStyles.css'
import styled from 'styled-components'


const TabBar = () => {
    const [activeTab, setActiveTab] = useState(imcc.ALL);

    let errCardsShowing = useSelector(state => state.cardsReducer.errCardsShowing);
    
    let currentOperatingCompany = useSelector(state => state.cardsReducer.operatingCompany);
    
    const toggle = (operatingCompany) => {
        

        if (activeTab !== operatingCompany) {
            setActiveTab(operatingCompany);

            //to change ErrCards state AND change detailsRequested State
            store.dispatch(operatingCompanyChanged(operatingCompany))
            
        }
    }


    return (

        <div>
            <Nav tabs>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.ALL, navLink: true })}
                        onClick={() => { toggle(imcc.ALL); }}
                    >
                        All Operating Companies
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.DNJ, navLink: true })}
                        onClick={() => { toggle(imcc.DNJ); }}
                        
                    >
                        <img src="https://www.godnj.com/wp-content/uploads/sites/8/2018/12/logo-dnj.png" alt='DNJ'></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.AIS, navLink: true })}
                        onClick={() => { toggle(imcc.AIS); }}
                    >
                       
                        <img src='https://shared.imcc.com/opco/logos/AIS-logo.png' alt='AIS'></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.GIS, navLink: true })}
                        onClick={() => { toggle(imcc.GIS); }}
                    >
                        <img src='https://www.gulfintermodal.com/wp-content/uploads/sites/9/2018/12/gis-logo-top-nr.png' alt='GIS'></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.HM, navLink: true })}
                        onClick={() => { toggle(imcc.HM); }}
                    >
                        <img src = 'http://www.hmitusa.com/wp-content/uploads/sites/10/2018/12/logo-hm-top.png' alt="H&M"></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.IMCG, navLink: true })}
                        onClick={() => { toggle(imcc.IMCG); }}
                    >
                        <img src = "https://www.imcg.com/wp-content/uploads/sites/19/2018/09/imcg-logo-nr.png" alt="IMCG"></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.OIS, navLink: true })}
                        onClick={() => { toggle(imcc.OIS); }}
                    >
                        <img src= "https://www.ohiointermodalservices.com/wp-content/uploads/sites/12/2018/12/ois-logo-web.png" alt="OIS"></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.PDS, navLink: true })}
                        onClick={() => { toggle(imcc.PDS); }}
                    >
                        <img src="https://www.pdsusa.com/wp-content/uploads/sites/20/2019/06/logo-pds-nr.png" alt="PDS"></img>
                    </NavLink>
                </NavItem>
            </Nav>


            <TabContent activeTab={activeTab}>

                <TabPane tabId={currentOperatingCompany}>
                    <Row>
                        <Col style={{background: "#DEE2E6"}} >
                            <ErrPane>
                                {errCardsShowing.map(errData => <ErrCard{...errData}></ErrCard>)}
                            </ErrPane>
                        </Col>
                    </Row>
                </TabPane>

            </TabContent>
        </div>
    )
}


export default TabBar