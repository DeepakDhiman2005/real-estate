import ProjectViewer from "@/components/ProjectViewer";

type CityNameType = Promise<{ cityName: string }>;

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