import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerFn } from "../services/user.service"; // Assuming this is the service for registering users
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation

// Yup validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    // .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    
    // Call register API with form values
    const response = await registerFn(values);
    setLoading(false);

    if (response.success) {
      toast.success("Registration successful!");
      navigate("/login");
    } else {
      toast.error(response.message || "Registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "Student",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <Field
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <Field
                type="text"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <Field as="select" name="role" className="w-full p-2 border border-gray-300 rounded-md">
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-xs" />
            </div>

            <button
              type="submit"
              className={`w-full p-2 bg-blue-500 text-white rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </Form>
        </Formik>

        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-500">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
