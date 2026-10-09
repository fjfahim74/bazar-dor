"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
    const [isGithubLoading, setIsGithubLoading] = React.useState(false);

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি!");
                setIsGoogleLoading(false);
            }
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন!");
            setIsGoogleLoading(false);
        }

    };

    const handleGithubSignIn = async () => {
        setIsGithubLoading(true);
        try {
            const { error } = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি!");
                setIsGithubLoading(false);
            }
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন!");
            setIsGithubLoading(false);
        }

    };




    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "সাইন ইন করা যায়নি!");
                return;
            }

            if (data) {
                toast.success("সফলভাবে সাইন ইন হয়েছে!");
                router.push("/");
            }
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="mx-auto max-w-md px-4 py-10">
            <div className="rounded-2xl border border-base-content/15 bg-base-100 p-6 sm:p-8">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    সাইন ইন
                </h1>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <fieldset className="fieldset">
                        <label className="label">ইমেইল</label>
                        <input
                            name="email"
                            type="email"
                            className="input w-full"
                            placeholder="আপনার ইমেইল"
                            required
                            disabled={isLoading}
                        />

                        <label className="label">পাসওয়ার্ড</label>
                        <input
                            name="password"
                            type="password"
                            className="input w-full"
                            placeholder="পাসওয়ার্ড দিন"
                            required
                            disabled={isLoading}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary mt-4 w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    সাইন ইন হচ্ছে...
                                </>
                            ) : (
                                "সাইন ইন করুন"
                            )}
                        </button>
                    </fieldset>
                </form>

                <div className="divider">অথবা</div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full"
                    disabled={isGoogleLoading || isGithubLoading || isLoading}
                >
                    {isGoogleLoading ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Google দিয়ে সাইন ইন হচ্ছে...
                        </>
                    ) : (
                        "Google দিয়ে সাইন ইন করুন"
                    )}
                </button>

                <div className="divider">অথবা</div>

                <button
                    type="button"
                    onClick={handleGithubSignIn}
                    className="btn btn-outline w-full"
                    disabled={isGithubLoading || isGoogleLoading || isLoading}

                >
                    {isGithubLoading ? (

                        <>
                            <span className="loading loading-spinner"></span>
                            GitHub দিয়ে সাইন ইন হচ্ছে...
                        </>
                    ) : (
                        "GitHub দিয়ে সাইন ইন করুন"
                    )}

                </button>




                <p className="mt-5 text-center text-sm">
                    অ্যাকাউন্ট নেই?{" "}
                    <a
                        href="/signup"
                        className="font-semibold text-primary hover:underline"
                    >
                        সাইন আপ করুন
                    </a>
                </p>
            </div>
        </main >
    );
};

export default SignInPage;
