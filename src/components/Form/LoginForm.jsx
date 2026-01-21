import { useEffect, useState } from "react";
import TextField from "../Common/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Common/Button";
import PasswordField from "../Common/PasswordField";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppContext } from "../../context/AppContext";
import { useLoginMutation } from "../../services/user/authApi";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    document.title = `Login - giveXchange`;
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login({
          email: values?.email.trim(),
          password: values?.password.trim(),
          userType: "super_admin",
        }).unwrap();

        if (response?.success) {
          Cookies.set("adminToken", response?.data?.token);
          Cookies.set("admin", JSON.stringify(response?.data?.user));
          setUser(response?.data?.user);
          resetForm();
          navigate("/");
        }
      } catch (error) {
        console.log("login error >>> ", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[350px] flex flex-col items-start gap-4 bg-transparent"
    >
      <img
        src="/logo.svg"
        alt="logo"
        className="w-[167px] lg:w-[267px] object-contain mx-auto"
      />
      <div className="w-full text-center space-y-3">
        <h2 className="font-semibold text-[32px] leading-none">Welcome Back</h2>
        <p className="text-[var(--secondary-color)]">
          Please enter details to continue
        </p>
      </div>
      <div className="w-full flex flex-col items-start gap-4 mt-3">
        <TextField
          type="text"
          name="email"
          placeholder="Enter your email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          label={`Email Address`}
        />

        <PasswordField
          name={`password`}
          placeholder={`Enter your password`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          label={`Password`}
        />

        <div className="pt-2 w-full">
          <Button type={"submit"} title={`Login`} isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
