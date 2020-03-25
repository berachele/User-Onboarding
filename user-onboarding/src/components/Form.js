import React, {useState, useEffect} from "react"
import * as yup from "yup"
import axios from "axios"

//setup Schema
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email().required("Must include an email"),
    password: yup.string().min(8, "Password must be a minimum of 8 characters").required("Password is required"),
    terms: yup.boolean().oneOf([true], "Please read and agree to the terms of use")
})

export default function Form () {
//managing state for our form inputs
const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
})
//set up state for errors
const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
})
//invalidate our buttton
const [buttonDisabled, setButtonDisabled] = useState(true)

//for the axios.post() so we can display it/console.log it
const [submission, setSubmission] = useState([])

//useEffect to enable/disable our submit button
useEffect(()=>{
    formSchema.isValid(formState)
    .then(valid=> {
        setButtonDisabled(!valid)
    })
}, [formState])

//implement validation, reach into schema and test validation
const validateChange = event => {
    yup.reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then(valid=>{
        setErrors({
            ...errors, [event.target.name]: ""
        })
    })
    .catch(error=>{
        setErrors({
            ...errors, [event.target.name]: error.errors[0]
        })
    })
}
//formSubmit function with axios.post
const submitForm = event => {
    event.preventDefault()
    axios.post("https://reqres.in/api/users", formState)
    .then(response=>{
        setSubmission(response.data)
        // console.log("Success!", submission)
        //resetting our form
        setFormState({
            name: "",
            email: "",
            password: "",
            terms: ""
        })
    })
    .catch(error=>{
        console.log("ERROR!", error)
    })
    console.log("Success!", submission)
}
//input change function with e.persist() and new data object
const inputChange=event=>{
    event.persist()
    const newFormData = {
        //need to create if else to check if value is checkbox or not
        ...formState, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
    }
    //bring in our validate and set to our event, update our formState
    validateChange(event)
    setFormState(newFormData)
}

//return statement for Form
    return (
        //add value and onChange later
        <form onSubmit={submitForm}>
            <label htmlFor="name" >Name<br/>
                <input id="name" type="text" name="name" value={formState.name} onChange={inputChange}/>
                {errors.name.length >0 ? (<p className="error">{errors.name}</p>) : null}
            </label>
        <br/>
            <label htmlFor="email" >Email<br/>
            <input id="email" type="text" name="email" value={formState.email} onChange={inputChange}/>
                {errors.email.length >0 ? (<p className="error">{errors.email}</p>) : null}
            </label>
        <br/>
            <label htmlFor="password" >Password<br/>
            <input id="password" type="password" name="password" value={formState.password} onChange={inputChange}/>
                {errors.password.length >0 ? (<p className="error">{errors.password}</p>) : null}
            </label>
        <br/>
            <label htmlFor="terms" >
            <input id="terms" type="checkbox" name="terms" checked={formState.terms} onChange={inputChange}/>
                {errors.terms.length >0 ? (<p className="error">{errors.terms}</p>) : null}
                I agree to the Terms and Conditions
            </label>
        <br/>
        {/* add button disablement later */}
        <button disabled={buttonDisabled} type="submit">Submit Form</button>
        <br/>
            {/* //can add pre tag here for JSON.stringify() */}
         <pre>{JSON.stringify(submission, null, 5)}</pre>
        </form>
    )
}