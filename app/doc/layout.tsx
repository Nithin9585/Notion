import LiveBlocksProvider from "@/components/LiveBlocksprovider";

function PageLayout({children}:{children: React.ReactNode}){
    return <LiveBlocksProvider>{children}</LiveBlocksProvider>
}

export default PageLayout;