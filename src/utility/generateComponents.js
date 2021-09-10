import { Tag } from "antd"

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

