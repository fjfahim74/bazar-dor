"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const UpdateProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;

            const { error } = await authClient.updateUser({ name });

            if (error) {
                toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি!");
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
            router.push("/profile");
            router.refresh();
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন!");
        } finally {
            setIsLoading(false);
        }
    };

    if (isPending) {
        return <p className="p-6 text-center">লোড হচ্ছে...</p>;
    }

    if (!session) {
        router.push("/signin");
        return null;
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <div className="rounded-2xl border border-base-content/15 bg-base-100 p-6 sm:p-8">
                <h1 className="mb-6 text-2xl font-bold">
                    প্রোফাইল আপডেট
                </h1>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <fieldset className="fieldset">
                        <label className="label">নাম</label>

                        <input
                            name="name"
                            type="text"
                            defaultValue={session.user.name}
                            className="input w-full"
                            placeholder="আপনার নাম"
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
                                    আপডেট হচ্ছে...
                                </>
                            ) : (
                                "তথ্য আপডেট করুন"
                            )}
                        </button>
                    </fieldset>
                </form>
            </div>
        </main>
    );
};

export default UpdateProfilePage;