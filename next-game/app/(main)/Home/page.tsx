import HeroBanner from "@/Sections/HomePage/HerroBanner"
import Collection from "@/Sections/HomePage/Collection"
import GameProductsSection from "@/Sections/HomePage/ProductGrid"
export default function HomePage() {
    return (
        <div>
            <HeroBanner />
            <Collection/>
            <GameProductsSection/>
        </div>
    )
}