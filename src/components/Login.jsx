import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        console.log(data)

        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex items-center justify-center flex-grow w-full'>
                <div className='w-full max-w-lg p-10 mx-auto bg-gray-100 border rounded-xl border-black/10'>
                    <div className="flex justify-center mb-2">
                    </div>
                    <h2 className="text-2xl font-bold leading-tight text-center">Sign in to your account</h2>
                    <p className="mt-2 text-base text-center text-black/60">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium transition-all duration-200 text-primary hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="mt-8 text-center text-red-600">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className='mt-8'>
                        <div className='space-y-5'>
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email Address Not Valid ",
                                    }
                                })}
                            />
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <Button
                                type="submit"
                                className="w-full py-2 text-white transition-all duration-300 bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white hover:scale-105"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-4 mt-auto text-gray-100 bg-gray-800">
                <div className="text-center">
                    &copy; 2023 YourSite.com | All Rights Reserved
                </div>
            </footer>
        </div>
    )
}

export default Login
