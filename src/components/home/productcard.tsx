interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    unit: string;
    image: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const getBanglaUnit = (unit: string) => {
        if (unit === "kg") return "প্রতি কেজি";
        if (unit === "litre") return "প্রতি লিটার";
        if (unit === "dozen") return "প্রতি ডজন";
        if (unit === "piece") return "প্রতি পিস";
        return `প্রতি ${unit}`;
    };

    const toBanglaNumber = (number: number) => {
        return number
            .toString()
            .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
    };

    return (
        <div className="rounded-2xl border border-base-content/15 bg-base-100 p-5">
            <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-base-300 text-3xl">
                    {product.image}
                </div>

                <div>
                    <h3 className="text-lg font-bold">
                        {product.nameBn}
                    </h3>

                    <p className="text-sm text-base-content">
                        {getBanglaUnit(product.unit)}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
                <div>
                    <p className="text-xs text-base-content">
                        আজকের দাম
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                        ৳{toBanglaNumber(product.today)}{" "}
                        <span className="text-sm font-normal text-base-content">
                            টাকা
                        </span>
                    </p>
                </div>

                <div>
                    {product.change.dir === "up" && (
                        <span className="rounded-full bg-error/10 px-2 py-1 text-sm font-medium text-error">
                            ▲ {toBanglaNumber(product.change.pct)}%
                        </span>
                    )}

                    {product.change.dir === "down" && (
                        <span className="rounded-full bg-success/10 px-2 py-1 text-sm font-medium text-success">
                            ▼ {toBanglaNumber(Math.abs(product.change.pct))}%
                        </span>
                    )}

                    {product.change.dir === "flat" && (
                        <span className="rounded-full bg-base-300 px-2 py-1 text-sm font-medium">
                            {toBanglaNumber(product.change.pct)}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;