import Header from "@/components/layout/Header";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SmoothScroll>
            <Header />
            {children}
        </SmoothScroll>
    );
}
