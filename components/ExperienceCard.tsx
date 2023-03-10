import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Experience } from "@/typings";
import { urlFor } from "@/sanity";

type Props = {
    experience: Experience;
};

function ExperienceCard({ experience }: Props) {
    return (
        <article className="mt-16 flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#413b3b] p-5 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
            <motion.img
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-32 h-32 rounded-full xl:w-[100px] xl:h-[100px] object-cover object-center"
                src={urlFor(experience?.companyImage).url()}
                alt=""
            />
            <div className="px-0 md:px-10">
                <h4 className="text-4xl font-light">{experience?.jobTitle}</h4>
                <p className="font-bold text-2xl mt-1">{experience?.company}</p>
                {experience.technologies != null ? (
                    <div className="flex space-x-2 my-2">
                        {experience.technologies.map((technology) => (
                            <Image
                                key={technology._id}
                                className="rounded-full"
                                src={urlFor(technology.image).url()}
                                alt=""
                                width={40}
                                height={40}
                            />
                        ))}
                    </div>
                ) : null}
                <p className="uppercase py-5 text-gray-300">
                    {new Date(experience.dateStarted).toDateString()} -{" "}
                    {experience.isCurrentWorkingHere
                        ? "Present"
                        : new Date(experience.dateEnded).toDateString()}
                </p>
                <ul className="list-disc space-y-4 ml-5 text-lg h-80 md:h-72 pr-5 overflow-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
                    {experience.points.map((point, i) => (
                        <li key={i} className="text-justify">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default ExperienceCard;
