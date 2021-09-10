import styled from 'styled-components'

const ErrPane = styled.div`
    resize: horizontal;
    overflow: auto;
    padding-right: 15px;
    padding-left: 15px;
    background: #F8F9FA;
    min-height: 18vh;
    height: 68vh;
    min-width: 40px;
    width: 100%;
    max-width: 55vw;
    margin-bottom: 10px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(120px, 120px));
    gap: 25px 25px;
`

export default ErrPane