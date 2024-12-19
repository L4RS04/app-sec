import { useRouter } from "next/navigation";
import UserService from "../../services/UserService";
import React, { useState } from "react";
import { StatusMessage } from "../../types";

const UserRegisterForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const clearErrors = () => {
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();
        setIsLoading(true);
    
        try {
            const newUser = {
                name,
                email,
                password,
            };
    
            const response = await UserService.registerUser(newUser);
    
            if (response.ok) {
                setStatusMessages([{ type: "success", message: "Registration successful! Redirecting to login..." }]);
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } else if (response.status === 400) {
                const errorData = await response.json();
                setStatusMessages([{ type: "error", message: errorData.message }]);
            }
        } catch (error) {
            setStatusMessages([{ type: "error", message: "An error occurred whilst registering the user" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1429b1]">
                        Create your account
                    </h2>
                </div>
                {statusMessages.length > 0 && (
                    <div className={`rounded-md p-4 ${statusMessages[0].type === "error" ? "bg-red-50" : "bg-green-50"}`}>
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className={`text-sm font-medium ${statusMessages[0].type === "error" ? "text-red-800" : "text-green-800"}`}>
                                    {statusMessages[0].type === "error" ? "There was an error with your submission" : "Success"}
                                </h3>
                                <div className={`mt-2 text-sm ${statusMessages[0].type === "error" ? "text-red-700" : "text-green-700"}`}>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {statusMessages.map(({ message }, index) => (
                                            <li key={index}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="nameInput"
                                name="name"
                                type="text"
                                required
                                className={`mt-1 appearance-none rounded-md relative block w-full px-2 py-2 border ${
                                    nameError ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 sm:text-sm`}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="emailInput"
                                name="email"
                                type="email"
                                required
                                className={`mt-1 appearance-none rounded-md relative block w-full px-2 py-2 border ${
                                    emailError ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 sm:text-sm`}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="passwordInput"
                                name="password"
                                type="password"
                                required
                                className={`mt-1 appearance-none rounded-md relative block w-full px-2 py-2 border ${
                                    passwordError ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 sm:text-sm`}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    {(nameError || emailError || passwordError) && (
                        <div className="text-red-500 text-sm mt-2">
                            {nameError && <p>{nameError}</p>}
                            {emailError && <p>{emailError}</p>}
                            {passwordError && <p>{passwordError}</p>}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1429b1] hover:bg-[#007bff] ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserRegisterForm;