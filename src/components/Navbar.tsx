import Image from "next/image";
import logoIcon from "@/assets/logo-icon.png";
import { getBanglaDate } from "@/components/shared/utils";
import type { Category } from "@/types/product";

const Navbar = async () => {
    const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories"
    );

    const categories: Category[] = await response.json();

    return (
        <nav>

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

                <div className="flex items-center gap-3">
                    <Image
                        src={logoIcon}
                        alt="বাজার দর"
                        width={40}
                        height={40}
                    />

                    <div>
                        <h1 className="text-lg font-bold sm:text-xl">
                            বাজার দর
                        </h1>

                        <p className="text-xs text-base-content/60 sm:text-sm">
                            {getBanglaDate()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <a href="/signin" className="btn btn-sm">
                        সাইন ইন
                    </a>

                    <a href="/signup" className="btn btn-sm btn-primary">
                        সাইন আপ
                    </a>
                </div>
            </div>

            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3">

                {categories.map((category) => (
                    <a
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-xs md:text-sm hover:bg-base-200"
                    >
                        <span>{category.icon}</span>
                        <span>{category.nameBn}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;