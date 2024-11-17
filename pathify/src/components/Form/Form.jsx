import React, { useState } from "react"

import RoleInfo from "./RoleInfo"
import RoleDescription from "./RoleDescription"
import Reflection from "./Reflection"
import "./Form.css"

function Form () {
    const [page, setPage] = useState(0)
    const FormTitles = ["Role Info", "Role Description", "Reflection"]

    const PageDisplay = () => {
        if (page === 0) {
            return <RoleInfo />
        } else if (page === 1) {
            return <RoleDescription />
        } else {
            return <Reflection />
        }
    }

    return <div className="form">
        <div className="form-container">
            <div className="header">
                <h1>{FormTitles[page]}</h1>
            </div>
            <div className="body">{PageDisplay()}</div>
            <div className="footer">
                <button onClick={() => {setPage(0)}}>1</button>
                <button onClick={() => {setPage(1)}}>2</button>
                <button onClick={() => {setPage(2)}}>3</button>
            </div>
        </div>
    </div>
}

export default Form;