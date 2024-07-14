import * as Yup from "yup";

export const SignupSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your valid email"),
  password: Yup.string().min(5).max(20).required("Please enter your password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "You entered password don't match")
    .required("Please enter your confirm password"),
});
