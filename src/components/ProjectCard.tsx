"use client";
import Image from "next/image";
import "../styles/project-card.scss";

interface Project {
    projectName: string;
    location: string;
    image: string;
    price: string;
    builderName: string;
    coordinates?: {
        latitude: number | null;
        longitude: number | null;
    };
}

const ProjectCard = ({
    projectName,
    location,
    image,
    price,
    builderName,
}: Project) => {
    return (
        <div className="project-card">
            <div className="left">
                <div className="image">
                    {image ? (
                        <Image
                            src={image}
                            alt={projectName || "Project Image"}
                            height={1000}
                            width={1000}
                        />
                    ) : (
                        <div className="placeholder">No Image Available</div>
                    )}
                </div>
            </div>
            <div className="right">
                <h2>{projectName}</h2>
                <h3>{location}</h3>
                <h3>{price}</h3>
                <p>{builderName}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
