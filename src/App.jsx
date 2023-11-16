import "./App.scss";
import { useState } from "react";
import ErrorIcon from "./assets/icon-error.svg";

function App() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = "First Name cannot be empty";
        }
        if (!formData.lastName.trim()) {
            errors.lastName = "Last Name cannot be empty";
        }
        if (!formData.password.trim()) {
            errors.password = "Password cannot be empty";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = "email cannot be empty";
        }
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            errors.email = "Looks like this is not an email";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Form submitted:", formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setFormErrors({
            ...formErrors,
            [name]: "",
        });
    };

    const fields = [
        { name: "firstName", type: "text", placeholder: "First Name" },
        { name: "lastName", type: "text", placeholder: "Last Name" },
        { name: "email", type: "text", placeholder: "Email Address" },
        { name: "password", type: "password", placeholder: "Password" },
    ];

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <input
                            value={formData[field.name]}
                            onChange={handleChange}
                            type="text"
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            className={
                                formErrors[field.name] ? "error" : undefined
                            }
                        />
                        {formErrors[field.name] && (
                            <>
                                <p className="error-span">
                                    {formErrors[field.name]}
                                </p>
                                <img
                                    src={ErrorIcon}
                                    alt=""
                                    className="error-icon"
                                />
                            </>
                        )}
                    </div>
                ))}
                <button type="submit" id="submit" title="submit">
                    CLAIM YOUR FREE TRIAL
                </button>
            </form>
        );
    };

    return (
        <main>
            <div className="container">
                <div className="info">
                    <h1>Learn to code by watching others</h1>
                    <p>
                        See how experienced developers solve problems in
                        real-time. Watching scripted tutorials is great, but
                        understanding how developers think is invaluable.{" "}
                    </p>
                </div>
                <div className="form">
                    <div className="offer">
                        <p>
                            <span>Try it free 7 days</span> then $20/mo.
                            thereafter
                        </p>
                    </div>
                    <div className="form-container">
                        {renderForm()}
                        <p className="terms">
                            By clicking the button, you are agreeing to our
                            <span> Terms and Services</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
