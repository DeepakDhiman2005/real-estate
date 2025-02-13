import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import * as cheerio from 'cheerio';
// import database from "@/db/database";

export async function GET(req: NextRequest) {
    try {

        // return NextResponse.json(database, { status: 200 });
        const params = new URL(req.url);
        const cityName = params.searchParams.get('cityName');

        const { data } = await axios.get(`https://www.magicbricks.com/new-projects-${cityName}`);
        const $ = cheerio.load(data);
        // const accessKey = process.env.POSITIONSTACK_ACCESS_KEY;
        // const apiUrl = `http://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${cityName}`;

        // Extract project data
        const projectElements = $('.mghome__prjblk__imgsec ').toArray();

        // Use Promise.all to handle async calls
        const projects = await Promise.all(projectElements.map(async (elem) => {
            // const geoResponse = await axios.get(apiUrl);
            // const locationData = geoResponse.data.data[0];

            // const coordinates = {
            //     latitude: locationData?.latitude || null,
            //     longitude: locationData?.longitude || null,
            // };
            
            return {
                image: $(elem).find('img').attr('data-src')?.trim(),
                projectName: $(elem).find('.mghome__prjblk__prjname').text().trim(),
                href: $(elem).find('.mghome__prjblk__prjname').attr('href')?.trim(),
                location: $(elem).find('.mghome__prjblk__locname').text().trim(),
                price: $(elem).find('.mghome__prjblk__price').text().trim(),
                builderName: $(elem).find('.mghome__prjblk__bhk').text().trim(),
                // coordinates,
            };
        }));

        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error('Scraping failed:', error);
        return NextResponse.json({ error: 'Scraping failed' }, { status: 500 });
    }
}
