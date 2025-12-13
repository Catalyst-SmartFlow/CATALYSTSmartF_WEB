export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Future Sidebar and Topbar will go here */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
