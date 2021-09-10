import {
    CheckCircleOutlined, CloseCircleOutlined, VerticalAlignTopOutlined, SyncOutlined
} from '@ant-design/icons';
import { Button, Col, Descriptions, Divider, PageHeader, Row, Space, Statistic, Switch, Tag, Timeline } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { cardMarkedResolved, cardResolvedAlert } from '../../actions/actions';
import store from '../../store';
import ErrorActivity from '../ErrorActivity';
import { generateDepartmentLabel } from '../../utility/generateComponents';
import ReassignButton from '../ReassignButton';


const ErrorHistoryScreen = () => {
    let { errID } = useParams()

    //pulls from API again so data still exists on browser refresh
    let location = useLocation();

    const selectedError = useSelector(state => state.cardsReducer.errData.find(element => element.errorID == errID));

    console.log(selectedError)

    const handleResolve = () => {
        store.dispatch(cardMarkedResolved(selectedError.errorID, location))
        store.dispatch(cardResolvedAlert(selectedError.errorID))
    }

    const [reverse, setReverse] = useState(false)

    const switchFlipped = () => {
        setReverse(!reverse)
    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                tags=   {
                    selectedError.isResolved ?
                        <Tag color="success" icon={<CheckCircleOutlined />}>Resolved</Tag>
    
                    : selectedError.markedResolved ?
                        <Tag color="processing" icon={<SyncOutlined spin />}>validating</Tag>
    
                    :
                        <Tag color="error" icon={<CloseCircleOutlined />}> Unresolved</Tag>
    
    
                }
                title={<span>Error <span style={{ color: "red" }}>{errID}</span></span>}
                subTitle="status"
                extra={[
                    <Space>
                        <Button type="primary" onClick={handleResolve}>Mark as Resolved</Button>
                        <ReassignButton {...selectedError}></ReassignButton>

                    </Space>
                ]}
            >
                <Descriptions title="Error Details" >
                    <Descriptions.Item label="Assigned To"  >{generateDepartmentLabel(selectedError.department)}</Descriptions.Item>
                    <Descriptions.Item label="Date Error Occurred"> {selectedError.errorDate.toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="Operating Company" > {selectedError.imcCompany}</Descriptions.Item>
                    <Descriptions.Item label=" Customer">{`${selectedError.customer}`}</Descriptions.Item>
                    <Descriptions.Item label="EDI Code">{`${selectedError.customerCode}`}</Descriptions.Item>
                    <Descriptions.Item label="Invoice Code" > {selectedError.invoiceCode} </Descriptions.Item>
                    <Descriptions.Item label="Generated Error Message" > {selectedError.errMessage} </Descriptions.Item>
                    <Descriptions.Item label="What this means..."> Lorem ipsum dolor sit amet, consectetur adipiscing elit </Descriptions.Item>
                </Descriptions>
                <Divider orientation="left" > Metrics </Divider>
                <Row>
                    <Statistic title="example" value="stat" />
                    <Statistic
                        title="Invoice Amount"
                        prefix="$"
                        value={selectedError.price}
                        style={{
                            margin: '0 32px',
                        }}
                    />
                    <Statistic title="example" prefix="$" value={'statistic'} />
                </Row>
            </PageHeader>

            <Divider />

            <Row gutter={20}>
                <Col span={12} style={{ paddingLeft: "15%" }}>
                    <Divider className='header'> Progress </Divider>
                    <h7> Most Recent </h7> <VerticalAlignTopOutlined /> {' '}

                    <Space direction='vertical' size="large">
                        <Switch
                            onChange={switchFlipped}
                        >
                        </Switch>



                        <Timeline pending="Recording..." reverse={reverse} >
                            <Timeline.Item>Error {selectedError.errID} generated on {selectedError.errorDate.toLocaleString()}</Timeline.Item>
                            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                        </Timeline>
                    </Space>
                </Col>

                <Col span={12} style={{ paddingRight: "15%" }}>
                    <Divider className='header'> Error History </Divider>
                    <ErrorActivity />
                </Col>
            </Row>
        </React.Fragment>



    )
}

export default ErrorHistoryScreen

