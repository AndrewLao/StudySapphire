import "./AddResponsibility.css"
import { useEffect, useRef } from "react"
import { UserContext } from "../../../App";
import { useContext, useState } from "react";

export default function AddResponsibility({setInMenu})
{
    const colors = ["#F44336", "#9C27B0",  "#3F51B5",  "#00BCD4",  
      "#355E3B", "#8BC34A", "#E81E63", "#673AB7", "#2196F3", "#62BECD", "#4CAF50", "#FFC107"]
    const nameRef = useRef();
    const {userData, setUserData} = useContext(UserContext);
    const [chosenColor, setChosenColor] = useState("#F44336")
    const [error, setError] = useState(false)


    function saveResponsibility() {
        let respName = nameRef.current.value
        if (!respName)
        {
            setError(true)
            return
        }
        let userCopy = JSON.parse(JSON.stringify(userData))
        let respIDs = userData.RESPONSIBILITYORDER.map((resp) => {
            return parseInt(resp, 10)
        })
        let nextID = ("" + Math.max(101, (Math.max(...respIDs) + 1)))
        console.log(nextID)
        let newResp = {
              "NAME": respName,
              "COLOR": chosenColor,
              "TASKS": []
            }
        userCopy.RESPONSIBILITYORDER.unshift(nextID)
        userCopy.RESPONSIBILITIES[nextID] = newResp
        setUserData(userCopy)
        setInMenu("NONE")
    }


    return ( 
    <div className="addResponsibility">
    <div className="addRespHeader">Add Responsibility</div>
    <div className="addRespName">
                        <label for="addRespName">Name:</label>
                        <br />
                        <input autoFocus type="text" id="addRespName" placeholder="Class" ref={nameRef}></input>
                    </div>
        <div className="selectColor">
            <p>Color:</p>
            <div className="colorGrid">
            {colors.map((color) => {
                return (
                    <div className="colorButton" 
                    style={color == chosenColor ? {backgroundColor: color, borderColor: "#ffffff"}: {backgroundColor: color} }
                    onClick={() => {setChosenColor(color)}}>
                    </div>
                )})}
            </div>
        </div>
        <div className="addRespFooterCenter">
            <div className="addRespFooter">
                <button className="addRespAddButton" onClick={() => {saveResponsibility()}}>Add</button>
                <button className="addRespCancelButton" onClick={() => {setInMenu("NONE")}}>Cancel</button>
            </div>
        </div>
    </div>)
}