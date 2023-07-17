import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password")
})

export const registerSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Enter your name"),
    email: Yup.string().email().required("Enter your email"),
    dob: Yup.string().required("Select your Date of Birth"),
    phoneNumber: Yup.string().required("Enter your phone number"),
    password: Yup.string().min(8).required("Enter your password"),
    confirm_password: Yup.string().min(8)
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export const taskSchema = Yup.object({
    task: Yup.string().min(6).max(50).required("Enter your task to perform"),
    activity: Yup.string().required("Select your activity"),
    date: Yup.string().required("Select date"),
    startTime: Yup.string().required("Select start time"),
    endTime: Yup.string().required("Select end time")
})