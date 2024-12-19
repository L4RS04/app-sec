import { useRouter } from "next/navigation";
import UserService from "../../services/UserService";
import React, { useState } from "react";
import { StatusMessage } from "../../types";
import { useTranslation } from 'next-i18next';

const UserLoginForm: React.FC = () => {
    const { t } = useTranslation('common');
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!name || name.trim() === "") {
            setNameError(t('nameRequired'));
            result = false;
        }

        if (!password || password.trim() === "") {
            setPasswordError(t('passwordRequired'));
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        const user = { name, password };
        try {
            const response = await UserService.loginUser(user);
            
            if (response.status === 200) {
                setStatusMessages([
                    {
                        type: "success", 
                        message: t('loginSuccess')
                    },
                ]);

                const user = await response.json();

                sessionStorage.setItem(
                    "loggedInUser", 
                    JSON.stringify({
                        token: user.token,
                        role: user.role,
                        name: user.name,
                        id: user.id
                    })
                );

                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                setStatusMessages([
                    {
                        type: "error",
                        message: t('invalidCredentials')
                    },
                ]);
            }
        } catch (error) {
            setStatusMessages([
                {
                    type: "error",
                    message: t('unknownError')
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-blue-900">
                        {t('signIn')}
                    </h2>
                </div>
                {statusMessages.length > 0 && (
                    <div className={`rounded-md p-4 ${statusMessages[0].type === "error" ? "bg-red-50" : "bg-green-50"}`}>
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className={`text-sm font-medium ${statusMessages[0].type === "error" ? "text-red-800" : "text-green-800"}`}>
                                    {statusMessages[0].type === "error" ? t('submissionError') : t('success')}
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
                            <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700">{t('username')}:</label>
                            <input
                                id="nameInput"
                                name="name"
                                type="text"
                                required
                                className={`mt-1 appearance-none rounded-md relative block w-full px-2 py-2 border ${
                                    nameError ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            {nameError && <p className="mt-2 text-sm text-red-600" id="name-error">{nameError}</p>}
                        </div>
                        <div>
                            <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">{t('password')}:</label>
                            <input
                                id="passwordInput"
                                name="password"
                                type="password"
                                required
                                className={`mt-1 appearance-none rounded-md relative block w-full px-2 py-2 border ${
                                    passwordError ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {passwordError && <p className="mt-2 text-sm text-red-600" id="password-error">{passwordError}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('signingIn')}
                                </>
                            ) : t('signIn')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserLoginForm;