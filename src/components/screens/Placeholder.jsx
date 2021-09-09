import { Container } from 'reactstrap'
import { Empty } from 'antd'
import './DetailsPane.css'

const Placeholder = () => {
        return (
            
                <div style={{display: "flex", alignItems:"center", justifyContent: "center", marginTop: "350px"}}>
                <Empty 
                    
                    description={
                        <span>
                            Pick an Error Card to see its details! 
                        </span>
                    } 
                />
                </div>
           
        )
}

export default Placeholder