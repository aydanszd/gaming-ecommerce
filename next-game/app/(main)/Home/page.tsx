import HeroBanner from "@/Sections/HomePage/HerroBanner"
import Collection from "@/Sections/HomePage/Collection"
import GameProductsSection from "@/Sections/HomePage/ProductGrid"
import GameBannersFeatures from "@/Sections/HomePage/GameBannersFeatures"
import GameStoreLocation from "@/Sections/GameStoreLocation"
export default function HomePage() {
    return (
        <div>
            <HeroBanner />
            <Collection/>
            <GameProductsSection/>
            <GameBannersFeatures/>
            <GameStoreLocation/>
        </div>
    )
}