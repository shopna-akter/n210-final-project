import { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        profilePicture: '',
        password: '',
        role: 'Worker'
    });

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        generalError: ''
    });

    const existingEmails = ['test@example.com', 'user@example.com'];

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordPattern.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let emailError = '';
        let passwordError = '';
        let generalError = '';

        if (!validateEmail(formData.email)) {
            emailError = 'Please enter a valid email address.';
        } else if (existingEmails.includes(formData.email)) {
            emailError = 'This email is already registered.';
        }

        if (!validatePassword(formData.password)) {
            passwordError = 'Password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.';
        }

        if (emailError || passwordError) {
            setErrors({ emailError, passwordError, generalError });
        } else {
            setErrors({ emailError: '', passwordError: '', generalError: '' });
            alert('Form submitted successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <div className="text-center mb-4">
                <h2 className="font-bold text-3xl">Register</h2>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                />
                {errors.emailError && <span className="text-red-500 text-sm">{errors.emailError}</span>}
            </div>
            <div className="mb-4">
                <label htmlFor="profilePicture" className="block text-gray-700">Profile Picture URL:</label>
                <input
                    type="url"
                    id="profilePicture"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                />
                {errors.passwordError && <span className="text-red-500 text-sm">{errors.passwordError}</span>}
            </div>
            <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700">Role:</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    required
                >
                    <option value="Worker">Worker</option>
                    <option value="TaskCreator">TaskCreator</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                Submit
            </button>
        </form>
    )
};

export default Register;