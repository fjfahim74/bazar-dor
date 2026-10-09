"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "সাইন আপ করা যায়নি!");
                return;
            }

            if (data) {
                toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
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
                    সাইন আপ
                </h1>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <fieldset className="fieldset">
                        <label className="label">নাম</label>
                        <input
                            name="name"
                            type="text"
                            className="input w-full"
                            placeholder="আপনার নাম"
                            required
                            disabled={isLoading}
                        />

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
                            placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                            minLength={8}
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
                                    সাইন আপ হচ্ছে...
                                </>
                            ) : (
                                "অ্যাকাউন্ট তৈরি করুন"
                            )}
                        </button>
                    </fieldset>
                </form>

                <p className="mt-5 text-center text-sm">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                    <a
                        href="/signin"
                        className="font-semibold text-primary hover:underline"
                    >
                        সাইন ইন করুন
                    </a>
                </p>
            </div>
        </main>
    );
};

export default SignUpPage;