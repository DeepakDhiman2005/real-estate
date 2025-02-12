import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const params = new URL(req.url);
        const location = params.searchParams.get('location');
        const accessKey = process.env.POSITIONSTACK_ACCESS_KEY;
        const apiUrl = `http://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${location}`;
        const geoResponse = await axios.get(apiUrl);
        const locationData = geoResponse.data.data[0];
        const coordinates = {
            latitude: locationData?.latitude || null,
            longitude: locationData?.longitude || null,
        };

        return NextResponse.json({ coordinates } , { status: 200 });
    } catch(error){        
        return NextResponse.json({ error: 'Location failed' }, { status: 500 });
    }
}