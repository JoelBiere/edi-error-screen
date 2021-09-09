import {
    CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { Button, Col, Descriptions, Divider, PageHeader, Row, Space, Statistic, Tag, Timeline } from 'antd';
import 'antd/dist/antd.css';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cardResolved, cardResolvedAlert } from '../../actions/actions';
import store from '../../store';
import ErrorActivity from '../ErrorActivity';
import { generateDepartmentLabel } from '../ErrorCards/ErrCard';
import ReassignButton from '../ReassignButton';


const ErrorHistoryScreen = () => {
    let { errID } = useParams()

    const selectedError = useSelector(state => state.cardsReducer.displayedCard);

    const handleResolve = () => {
        store.dispatch(cardResolved(selectedError.errorID))
        store.dispatch(cardResolvedAlert(selectedError.errorID))
    }

    const [reverse, setReverse] = useState(false)

    const handleClick = () => {
        setReverse(!reverse)
    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                tags={
                    selectedError.isResolved ?
                        <Tag color="success" icon={<CheckCircleOutlined />}> Resolved </Tag>
                        :
                        <Tag color="error" icon={<CloseCircleOutlined />}>Unresolved</Tag>
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
                <Divider />
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

            <Row gutter={{ xs: 8 }}>
                <Col span={12} style={{ paddingLeft: "15%" }}>
                    <Timeline pending="Recording..." reverse= {reverse} >
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    </Timeline>
                    <Button type="primary" style={{ marginTop: 16 }} onClick={handleClick}>
                        Toggle Reverse
                    </Button>
                </Col>
                <Col span={12}>
                    <ErrorActivity />
                </Col>
            </Row>
        </React.Fragment>



    )
}

export default ErrorHistoryScreen

