import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const params = new URL(req.url);
        const location = params.searchParams.get('location')?.toLowerCase();
        const accessKey = process.env.POSITIONSTACK_ACCESS_KEY;
        const apiUrl = `http://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${location}`;
        const geoResponse = await axios.get(apiUrl);

        // Ensure data exists and is an array
        const locationData = geoResponse.data.data?.find((item: any) =>
            location?.includes(item?.name?.toLowerCase() || "")
        );

        const coordinates = locationData
            ? { latitude: locationData.latitude, longitude: locationData.longitude }
            : { latitude: null, longitude: null };

        return NextResponse.json({ coordinates }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Location failed" }, { status: 500 });
    }
}
