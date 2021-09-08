import * as department from './ImcDepartments'
import * as imcc from './actions/imcOperatingCompanies'

const departmentAssigner = () => {
    let num = Math.floor(Math.random() * 3)

    // eslint-disable-next-line default-case
    switch (num) {
        case (0):
            return department.operations
        case (1):
            return department.ediTeam
        case (2):
            return department.accounting
    }

}

const operatingCompanyAssigner = () => {
    let num = Math.floor(Math.random() * 7)

    // eslint-disable-next-line default-case
    switch (num) {
        case (0):
            return imcc.AIS
        case (1):
            return imcc.DNJ
        case (2):
            return imcc.GIS
        case (3):
            return imcc.HM
        case (4):
            return imcc.IMCG
        case (5):
            return imcc.OIS
        case (6):
            return imcc.PDS
    }

}

const dummyData = (numOfData) => {
    let returnData = []

    for (let i = 0; i < numOfData; i++) {
        returnData.push(
            {
                errorID: i,
                invoiceCode: `${i}${i + 9}${i - 3}${i}`,
                errorDate: new Date(1985 + i, 8, i),
                customer: `${i} company`,
                customerCode: `${i}${i + 1}${i - 4}${i}`,
                imcCompany: operatingCompanyAssigner(),
                errMessage: `Err of ${i} had an error--fix plz!!`,
                price: 10 * i - i*3 +2.40,
                department: departmentAssigner(),
                isResolved: false
            }
        )
    }
    return returnData;
}

const data = dummyData(30);


export default data;


