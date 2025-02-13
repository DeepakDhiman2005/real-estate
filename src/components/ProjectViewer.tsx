"use client";

import { useEffect, useState } from 'react';
import { useProjectsStore } from '@/store/useProjectStore';
// import MapComponent from './MapComponent';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Spin from './Spin';
// import ProjectCard from '../../components/ProjectCard';

const ProjectViewer = ({ cityName }: { cityName: string }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const { projects, addProject, clearProjects } = useProjectsStore();
    const [isSearch, setIsSearch] = useState<string>('');
    const router = useRouter();

    console.log(projects);

    const fetchProjects = async () => {
        clearProjects();
        setIsLoader(true);
        const response = await fetch(`http://localhost:3000/api/scrape?cityName=${cityName}`);
        const data = await response.json();
        for (const project of data) {
            if ((project.location as string).toLowerCase().match(cityName.toLowerCase())) {
                addProject({ ...project });
            }
        }

        // try {
        //     for (const project of data) {
        //         const geoRes = await axios.get(`http://localhost:3000/api/geocode?location=${project.location}`);
        //         addProject({ ...project, coordinates: geoRes.data?.coordinates });
        //         // addProject({ ...project });
        //     }
        // } catch (error) {
        //     console.log('geo location failed', error);
        //     for (const project of data) {
        //         addProject({ ...project });
        //     }
        // }
        setIsLoader(false);
    };

    useEffect(() => {
        if (!cityName) return;
        fetchProjects();
    }, [cityName]);

    const onSearch = () => {
        // console.log(isSearch);
        router.push(`/city/${isSearch}`);
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">All {projects.length > 0 ? projects.length : 0} New Projects in {cityName}</h1>
            <div className='flex flex-start border border-solid items-center gap-x-2 border-gray-300 rounded-3xl px-3 w-[200px] overflow-hidden'>
                <input type="text" className='outline-none py-1 px-2 w-full' placeholder='Search' onChange={(e) => setIsSearch(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch();
                    }
                }} />
                <button className='cursor-pointer hover:text-blue-700' onClick={onSearch}>
                    <IoSearchSharp size={18} />
                </button>
            </div>

{
    // projects.length > 0 ? <MapComponent projects={projects} load={isLoader} />: null
}

            <div className='w-full my-6 flex flex-col justify-start items-center gap-y-4 px-4'>
                {
                    projects.length > 0 ? projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    )) : (
                        !isLoader ? <h2 className='font-semibold text-[30px] my-16'>Data Not Avaliable!</h2>: null
                    )
                }
                {
                    isLoader ? <>
                        <div className='flex justify-center items-center h-[400px] w-auto rounded-[12px] mt-[1rem]'>
                            <Spin />
                        </div>
                    </> : null
                }
            </div>
        </div>
    );
}


export default ProjectViewer;