import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center justify-center flex-grow w-full">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className="flex justify-center mb-2">
                    </div>
                    <h2 className="text-2xl font-bold leading-tight text-center">Sign up to create account</h2>
                    <p className="mt-2 text-base text-center text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium transition-all duration-200 text-primary hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="mt-8 text-center text-red-600">{error}</p>}
                    <form onSubmit={handleSubmit(create)}>
                        <div className="space-y-5">
                            <Input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
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
                                Create Account
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

export default Signup
