import ProjectViewer from "@/components/ProjectViewer";
import { Metadata } from "next";

type CityNameType = Promise<{ cityName: string }>;

export async function generateMetadata({ params }: { params: CityNameType }): Promise<Metadata>{
    const { cityName } = await params;
    
    return {
        title: `Projects in ${cityName}`,
    }
}

const CityName = async ({ params }: { params: CityNameType }) => {
    const { cityName } = await params;
    // const response = await fetch(`http://localhost:3000/api/scrape?cityName=${cityName}`);
    // const data = await response.json();
    // console.log(data);

    return <>
        <ProjectViewer cityName={cityName} />
    </>
}

export default CityName;