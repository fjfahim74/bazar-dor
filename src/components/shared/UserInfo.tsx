"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    if (isPending) {
        return null;
    }

    if (!session) {
        return (
            <div className="flex items-center gap-2">
                <a href="/signin" className="btn btn-sm">
                    সাইন ইন
                </a>

                <a href="/signup" className="btn btn-sm btn-primary">
                    সাইন আপ
                </a>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Link href="/profile">
                <span className="text-sm font-medium">
                    {session.user.name || session.user.email}
                </span>
            </Link>

            <button
                onClick={handleSignOut}
                className="btn btn-sm btn-outline"
            >
                সাইন আউট
            </button>
        </div>
    );
};

export default UserInfo;