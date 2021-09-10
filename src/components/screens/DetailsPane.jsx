import { Button, Descriptions, Divider, Result, Steps, Space } from 'antd';
import React from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { cardMarkedResolved, cardResolvedAlert } from '../../actions/actions';
import store from '../../store';
import { generateDepartmentLabel } from '../../utility/generateComponents';
import ReassignButton from '../ReassignButton';
import './DetailsPane.css';
import { Redirect, useRouteMatch, Switch, Link } from 'react-router-dom'
import ErrorHistoryScreen from './ErrorHistoryScreen';

const { Step } = Steps;



const DetailsPane = (props) => {

    const handleResolve = () => {
        store.dispatch(cardMarkedResolved(props.errorID))
        store.dispatch(cardResolvedAlert(props.errorID))
    }
    const isResolved = props.isResolved


    return (
        <div>
            <Container className='mainContainer' >

                <Row >
                    {isResolved ?
                        <Result
                            status="success"
                            title={`Error ${props.errorID} was resolved`}
                            subTitle="Other information will go here"
                            extra={[
                                <Button type="primary" key='unresolve'>Mark as Unresolved</Button>
                            ]}
                        />
                        :
                        <Col sm="12" md={{ size: 6, offset: 6 }}>
                            <div className='topButtons'>
                                <Space>
                                    <Button type="primary" onClick={handleResolve}>Mark as Resolved</Button>
                                    <ReassignButton {...props}></ReassignButton>

                                    <Link to={`/history/${props.errorID}`} >
                                        <Button > See Details Page</Button>
                                    </Link>

                                </Space>
                            </div>
                        </Col>}
                </Row>

                <Row className='bigSection' >
                    <CardBody>
                        <Card body className="text-center">
                            <CardTitle tag="h2"> Error ID: <span style={{ color: "#E63946" }}> {props.errorID} </span> </CardTitle>
                        </Card>
                    </CardBody>

                </Row>
                <Row>
                    <Descriptions title="Error Details" bordered>
                        <Descriptions.Item label="Assigned To" span={2} >{generateDepartmentLabel(props.department)}</Descriptions.Item>
                        <Descriptions.Item label="Date Error Occurred"> {props.errorDate.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Operating Company" span={2}> {props.imcCompany}</Descriptions.Item>
                        <Descriptions.Item label=" Customer (EDI Code)">{`${props.customer} (${props.customerCode})`}</Descriptions.Item>
                        <Descriptions.Item label="Invoice Code" span={2}> {props.invoiceCode} </Descriptions.Item>
                        <Descriptions.Item label="Generated Error Message" span={2}> {props.errMessage} </Descriptions.Item>
                        <Descriptions.Item label="What this means..." span={3}> Lorem ipsum dolor sit amet, consectetur adipiscing elit </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <h4>Possible Solutions </h4>
                    <Divider />
                    <Steps progressDot current={1}>
                        <Step title="Finished" description="This is a description." />
                        <Step title="In Progress" description="This is a description." />
                        <Step title="Waiting" description="This is a description." />
                    </Steps>
                    <Divider />
                    <Steps progressDot current={1} direction="vertical">
                        <Step title="Finished" description="This is a description. This is a description." />
                        <Step title="Finished" description="This is a description. This is a description." />
                        <Step title="In Progress" description="This is a description. This is a description." />
                        <Step title="Waiting" description="This is a description." />
                        <Step title="Waiting" description="This is a description." />
                    </Steps>
                </Row>
                <Row >
                    {isResolved ?
                        null
                        :
                        <Col sm="12" md={{ size: 6, offset: 6 }}>
                            <div className='topButtons'>
                                <Space>
                                    <Button type="primary" onClick={handleResolve}>Mark as Resolved</Button>
                                    <ReassignButton {...props}></ReassignButton>
                                </Space>
                            </div>
                        </Col>}
                </Row>
            </Container>

           
        </div>

    )
}

export default DetailsPane;






