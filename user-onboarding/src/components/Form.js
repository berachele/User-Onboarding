import React, {useState, useEffect} from "react"
import * as yup from "yup"
import axios from "axios"

//setup Schema

export default function Form () {
//managing state for our form inputs
const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
})
//set up state for errors
//invalidate our buttton
//for the axios.post() so we can display it/console.log it
//useEffect to enable/disable our submit button
//validation function, reach into schema and test validation
//formSubmit function with axios.post
//input change function with e.persist() and new data object

//return statement for Form
    return (
        //add value and onChange later
        <form >
            <label htmlFor="name" >Name<br/>
                <input id="name" type="text" name="name"/>
                {/* setting up our errors will go here */}
            </label>
        <br/>
            <label htmlFor="email" >Email<br/>
            <input id="email" type="text" name="email"/>
                {/* setting up our errors will go here */}
            </label>
        <br/>
            <label htmlFor="password" >Password<br/>
            <input id="password" type="password" name="password"/>
                {/* setting up our errors will go here */}
            </label>
        <br/>
            <label htmlFor="terms" >
            <input id="terms" type="checkbox" name="terms" checked={true}/>
                {/* setting up our errors will go here */}
                I agree to the Terms and Conditions
            </label>
        <br/>
        <input type="submit" />
        <br/>
            {/* //can add pre tag here for JSON.stringify() */}
        </form>
    )
}