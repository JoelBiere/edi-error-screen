import { Tag } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons'


export const generateDepartmentLabel = (department) => {
    switch (department) {
        case ("Operations"):
            return <Tag color="blue"> Operations</Tag>

        case ("EDI Team"):
            return <Tag color="purple" > EDI Team</Tag>

        case ("Accounting"):
            return <Tag color="cyan"> Accounting </Tag>

        default:
            return <Tag> {department} </Tag>
    }
}

export const generateResolvedStatusTag = (errorData) => {

    if (errorData.isResolved)
        return <Tag color="success" icon={<CheckCircleOutlined />}>Resolved</Tag>

    else if (errorData.markedResolved)
        return <Tag color="processing" icon={<SyncOutlined spin />}>validating</Tag>

    else
        return <Tag color="error" icon={<CloseCircleOutlined />}> Unresolved</Tag>
}

export const convertMsToDate = (miliseconds) => {
    return new Date(miliseconds)
}