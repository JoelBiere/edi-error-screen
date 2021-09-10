import { CheckOutlined, ClockCircleOutlined, CloseOutlined, DollarOutlined, IssuesCloseOutlined, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import { Divider, Statistic, Switch } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonDropdown, ButtonGroup, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { showResolvedToggled, sortedByClient, sortedByDepartment, sortedByErrorID, sortedByInvoiceAmount, sortedByLeastRecent, sortedByMostRecent } from '../../actions/actions';
import * as imcc from '../../actions/imcOperatingCompanies';
import store from '../../store';
import Activity from '../Activity';
import './FilterPane.css';

const FilterPane = () => {
    const toggleResolved = (checked) => {
        store.dispatch(showResolvedToggled(checked))
    }

    const resolvedCards = useSelector(state => state.cardsReducer.resolvedCards)
    const currentOperatingCompany = useSelector(state => state.cardsReducer.operatingCompany)
    const radioStatus = useSelector(state => state.cardsReducer.sortedBy)
    const errCardsShowing = useSelector(state => state.cardsReducer.errCardsShowing)

    const findElapsedDays = () => {
        errCardsShowing.sort((a, b) => a.errorDate > b.errorDate ? 1 : a.errorDate < b.errorDate ? -1 : 0)
        let oldestError = errCardsShowing[0]
        if (oldestError === undefined) {
            return <LoadingOutlined />
        }
        let end = oldestError.errorDate.getTime()
        let start = Date.now()
        let differenceInTime = end - start

        return Math.floor(differenceInTime / (1000 * 3600 * 24) * -1)

    }

    const findTotalResolved = (currentCompany) => {

        if (currentCompany !== imcc.ALL) {

            let resolvedErrorsForCurrentCompany = resolvedCards.filter(obj => obj.imcCompany === currentCompany)

            return resolvedErrorsForCurrentCompany.length
        }
        return resolvedCards.length

    }


    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);


    const sortCards = (value) => {
        console.log(value)
        switch (value) {
            case ('department'):
                store.dispatch(sortedByDepartment())
                break;
            case ('errID'):
                store.dispatch(sortedByErrorID())
                break;
            case ('mostRecent'):
                store.dispatch(sortedByMostRecent())
                break;
            case ('leastRecent'):
                store.dispatch(sortedByLeastRecent())
                break;
            case ('invoiceAmnt'):
                store.dispatch(sortedByInvoiceAmount())
                break;
            case ('client'):
                store.dispatch(sortedByClient())
                break;
            default:
                return null

        }

    }

    return (
        <React.Fragment>
            <Row >
                <Col xs="auto" className='filterBox' >


                    <Divider className='header'> Filters </Divider>

                    <h7 className="switchLabel"> Show Resolved </h7>

                    <Switch
                        size='large'
                        style={{ width: '20%', }}
                        className='switch'
                        onChange={toggleResolved}
                        checked={useSelector(state => state.cardsReducer.includeResolved)}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}>
                    </Switch>

                    <h7 className='orderLabel'> Order By:</h7>

                    <ButtonGroup className='orderBy' size="sm">
                        <Button
                            className="btn shadow-none"
                            outline={!radioStatus.department}
                            color="secondary"
                            onClick={() => sortCards('department')}
                        >
                            Department
                        </Button>
                        <Button
                            className="btn shadow-none"
                            outline={!radioStatus.errID}
                            color="secondary"
                            onClick={() => sortCards('errID')}
                        >
                            ID
                        </Button>
                        <Button
                            className="btn shadow-none"
                            outline={!radioStatus.invoiceAmount}
                            color="secondary"
                            onClick={() => sortCards('invoiceAmnt')}
                        >
                            $$$
                        </Button>
                        <Button
                            className="btn shadow-none"
                            outline={!radioStatus.client}
                            color="secondary"
                            onClick={() => sortCards('client')}
                        >
                            Client
                        </Button>

                        <ButtonDropdown className="orderBy" color='secondary' isOpen={dropdownOpen} toggle={toggle} direction='right'>
                            <DropdownToggle caret outline size='sm'>
                                {''}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => sortCards('mostRecent')}> Most Recent </DropdownItem>
                                <DropdownItem onClick={() => sortCards('leastRecent')}> Least Recent</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </ButtonGroup>

                </Col>


                <Col xs='auto' className='metricsBox'>

                    <Divider className='header'> Metrics </Divider>

                    <Statistic
                        className="fact1"
                        title="Total Errors"
                        value={useSelector(state => state.cardsReducer.errCardsShowing.length)}
                        valueStyle={{ color: 'red' }}
                        prefix={<WarningOutlined />}
                    />
                    <Statistic
                        className="fact2"
                        title="Total Resolved"
                        value={findTotalResolved(currentOperatingCompany)}
                        prefix={<IssuesCloseOutlined />}
                        valueStyle={{ color: '#5cb85c' }}
                    />
                    <Statistic
                        className="fact3"
                        title="Oldest Error"
                        value={findElapsedDays()}
                        suffix="days"
                        prefix={<ClockCircleOutlined />}
                    />
                    <Statistic
                        className="fact4"
                        title="Total Uncollected Revenue"
                        value={Math.ceil(useSelector(state => state.cardsReducer.errCardsShowing.reduce((prev, cur) => prev + cur.price, 0)) * 100) / 100}
                        prefix={<DollarOutlined />}
                        valueStyle={{ color: 'red' }}
                    />
                </Col>

                <Col xs="5">
                    <Divider className='header'> Site Activity </Divider>
                    <Activity className='content' />

                </Col>
            </Row>
            <Divider />
        </React.Fragment>
    )
}

export default FilterPane