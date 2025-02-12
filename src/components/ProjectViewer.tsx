"use client";

import { useEffect, useState } from 'react';
import { useProjectsStore } from '@/store/useProjectStore';
import MapComponent from './MapComponent';
import ProjectCard from './ProjectCard';
// import ProjectCard from '../../components/ProjectCard';

const ProjectViewer = ({ cityName }: { cityName: string }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const { projects, addProject, clearProjects } = useProjectsStore();

    console.log('my projects', projects);

    useEffect(() => {
        if (!cityName) return;

        const fetchProjects = async () => {
            clearProjects();
            setIsLoader(true);
            const response = await fetch(`http://localhost:3000/api/scrape?cityName=${cityName}`);
            const data = await response.json();

            for (const project of data) {
                // const geoRes = await axios.get(`${baseUrl}/api/geocode?location=${project.location}`);
                // addProject({ ...project, coords: geoRes.data });
                addProject({ ...project });
            }
            setIsLoader(false);
        };

        fetchProjects();
    }, [cityName]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Projects in {cityName}</h1>
            <MapComponent projects={projects} load={isLoader} />

            <div className='w-full my-6 flex flex-col justify-start items-center gap-y-4 px-4'>
                {
                    projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))
                }
            </div>
        </div>
    );
}


export default ProjectViewer;