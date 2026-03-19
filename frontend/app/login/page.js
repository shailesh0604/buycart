import React from 'react'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const Login = () => {
    return (
        <>
            <section className='section-login'>

                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            alt="Your Company" width={0} height={0}
                            src="/assets/images/logo/logo.png" sizes='100%'
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder='Enter email address'
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-orange-400 hover:text-orange-300">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='Enter password'
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-white outline-1 -outline-offset-1 outline-black/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-3 text-sm/6 font-semibold text-white hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center justify-center gap-2.5 my-5">
                            <div className="w-full h-0.5 bg-gray-200"></div>
                            <div className="text-nowrap font-medium text-base">Or continue with</div>
                            <div className="w-full h-0.5 bg-gray-200"></div>
                        </div>

                        <div className="flex gap-4">
                            <a className='flex items-center justify-center py-3 rounded gap-2.5 w-full outline-1 outline-gray-200'>
                                <span>
                                    <FcGoogle />
                                </span>
                                <span>Google</span>
                            </a>
                            <a className='flex items-center justify-center py-3 rounded gap-2.5 w-full outline-1 outline-gray-200'>
                                <span>
                                    <FaGithub />
                                </span>
                                <span>Github</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login