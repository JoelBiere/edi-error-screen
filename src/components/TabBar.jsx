import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { operatingCompanyChanged } from '../actions/actions';
import * as imcc from '../actions/imcOperatingCompanies';
import ErrCard from '../components/ErrorCards/ErrCard';
import ErrPane from './screens/ErrPane';
import './TabBarStyles.css';


const TabBar = () => {
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState(imcc.ALL);

    let errCardsShowing = useSelector(state => state.cardsReducer.errCardsShowing);
    
    let currentOperatingCompany = useSelector(state => state.cardsReducer.operatingCompany);
    
    const toggle = (operatingCompany) => {
        

        if (activeTab !== operatingCompany) {
            setActiveTab(operatingCompany);

            //to change ErrCards state AND change detailsRequested State
            dispatch(operatingCompanyChanged(operatingCompany))
            
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
                        <img src="https://imcc.sharepoint.com/Lists/CompanyLogos/Attachments/16/dnj-logo.png" alt='DNJ'></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.AIS, navLink: true })}
                        onClick={() => { toggle(imcc.AIS); }}
                    >
                       
                        <img src='https://imcc.sharepoint.com/Lists/CompanyLogos/Attachments/15/ais.png' alt='AIS'></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.GIS, navLink: true })}
                        onClick={() => { toggle(imcc.GIS); }}
                    >
                        <img src='https://imcc.sharepoint.com/Lists/CompanyLogos/Attachments/17/gis-logo.png' alt='GIS'></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.HM, navLink: true })}
                        onClick={() => { toggle(imcc.HM); }}
                    >
                        <img src = 'https://imcc.sharepoint.com/Lists/CompanyLogos/Attachments/18/hm-logo.png' alt="H&M"></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.IMCG, navLink: true })}
                        onClick={() => { toggle(imcc.IMCG); }}
                    >
                        <img src = "https://imcc.sharepoint.com/Lists/CompanyLogos/Attachments/19/imcg.png" alt="IMCG"></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.OIS, navLink: true })}
                        onClick={() => { toggle(imcc.OIS); }}
                    >
                        <img src= "https://imcc.sharepoint.com/Lists/CompanyLogos/Attachments/21/ois.png" alt="OIS"></img>
                    </NavLink>
                </NavItem>
                <NavItem className="tabItem">
                    <NavLink
                        className={classnames({ active: activeTab === imcc.PDS, navLink: true })}
                        onClick={() => { toggle(imcc.PDS); }}
                    >
                        <img src="https://imcc.sharepoint.com/Lists/CompanyLogos/Attachments/26/imc-pds.png" alt="PDS"></img>
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