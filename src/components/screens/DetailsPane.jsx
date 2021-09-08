import { Button as ResultButton, Descriptions, Divider, Result, Steps } from 'antd';
import React from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { cardResolved, cardResolvedAlert } from '../../actions/actions';
import store from '../../store';
import { generateDepartmentLabel } from '../ErrorCards/ErrCard';
import ReassignButton from '../ReassignButton';
import './DetailsPane.css';


const { Step } = Steps;

const DetailsPane = (props) => {

    const handleResolve = () => {
        store.dispatch(cardResolved(props.errorID))
        store.dispatch(cardResolvedAlert(props.errorID))
    }
    const isResolved = props.isResolved


    return (
        <div>
            <Divider style={{marginBottom:'0px'}}/>

            <Container className='mainContainer' >

                <Row >
                    {isResolved ?
                        <Result
                            status="success"
                            title={`Error ${props.errorID} was resolved`}
                            subTitle="Other information will go here"
                            extra={[
                                <ResultButton type="primary" key='unresolve'>Mark as Unresolved</ResultButton>
                            ]}
                        />
                        :
                        <Col sm="12" md={{ size: 6, offset: 6 }}>
                            <div className='topButtons'>
                                <Button color="primary" onClick={handleResolve}>Mark as Resolved</Button>{' '}
                                <ReassignButton {...props}></ReassignButton>
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
                    {/* <Col>
                        <Row className='tableRow'>
                            <Col sm="4" className="leftCol"> Assigned To</Col>
                            <Col md="3" className='rightCol'> {generateDepartmentLabel(props.department)} </Col>
                        </Row>
                        <Row className='tableRow'>
                            <Col sm="4" className="leftCol">IMC Company</Col>
                            <Col md="8" className="rightCol"> {props.imcCompany}</Col>
                        </Row>
                        <Row className='tableRow'>
                            <Col sm="4" className="leftCol"> Customer (EDI Code)</Col>
                            <Col md="8" className="rightCol"> {`${props.customer} (${props.customerCode})`}</Col>
                        </Row>
                        <Row className="tableRow">
                            <Col sm="4" className="leftCol"> Invoice Code </Col>
                            <Col md="8" className="rightCol"> {props.invoiceCode} </Col>
                        </Row>
                        <Row className="tableRow">
                            <Col sm="4" className="leftCol"> Date Error Occurred </Col>
                            <Col md="8" className="rightCol"> {props.errorDate.toLocaleString()} </Col>
                        </Row>
                        <Row className="tableRow">
                            <Col sm="4" className="leftCol"> Generated Error Message </Col>
                            <Col md="8" className="rightCol"> {props.errMessage} </Col>
                        </Row>
                    </Col> */}

                    <Descriptions title="Error Details" bordered>
                        <Descriptions.Item label="Assigned To" span={2} >{generateDepartmentLabel(props.department)}</Descriptions.Item>
                        <Descriptions.Item label="Date Error Occurred"> {props.errorDate.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Operating Company"> {props.imcCompany}</Descriptions.Item>
                        <Descriptions.Item label=" Customer (EDI Code)">{`${props.customer} (${props.customerCode})`}</Descriptions.Item>
                        <Descriptions.Item label="Invoice Code"> {props.invoiceCode} </Descriptions.Item>
                        <Descriptions.Item label="Generated Error Message" span={3}> {props.errMessage} </Descriptions.Item>
                        <Descriptions.Item label="What this means..."> Lorem ipsum dolor sit amet, consectetur adipiscing elit </Descriptions.Item>
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


                    {/* <Col>
                        <Row>
                            <Col >
                                <Card>
                                    <CardBody>
                                        <CardSubtitle tag="h6"> What this means...</CardSubtitle>

                                        <CardText className="errMsg"> Lorem ipsum dolor sit amet, consectetur adipiscing elit</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Divider />
                        </Row>

                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <CardSubtitle tag="h6">Possible Solutions</CardSubtitle>
                                        <CardText>
                                            <ol>
                                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                                <li>Curabitur eget tellus odio. Praesent posuere lorem non nisl ullamcorper, a commodo dui interdum.</li>
                                                <li>Nam et ultricies enim. Sed luctus lorem vitae condimentum mollis. Suspendisse efficitur tortor ac felis consequat, vitae ultricies justo elementum. Proin lobortis libero at arcu efficitur pellentesque. Mauris sed ante malesuada, condimentum eros vestibulum, elementum dolor.</li>
                                                <li>Etiam ipsum ex, suscipit at ex non, porta ullamcorper sapien. Pellentesque condimentum, dui et laoreet lobortis, felis neque venenatis nulla, in convallis velit justo sed eros. Integer convallis gravida condimentum. Sed volutpat elit risus, a dapibus metus imperdiet quis</li>
                                            </ol>

                                        </CardText>
                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Col> */}
                </Row>
                <Row >
                    {isResolved ?
                        null
                        :
                        <Col sm="12" md={{ size: 6, offset: 6 }}>
                            <div className='topButtons'>
                                <Button color="primary" onClick={handleResolve}>Mark as Resolved</Button>{' '}
                                <ReassignButton {...props}></ReassignButton>
                            </div>
                        </Col>}
                </Row>
            </Container>
        </div>

    )
}

export default DetailsPane;






