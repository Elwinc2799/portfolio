import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
import Link from "next/link";
import Image from "next/image";
import { PageInfo, Experience, Skill, Project, Social } from "@/typings";
import { GetStaticProps } from "next";
import { fetchPageInfo } from "@/utils/fetchPageInfo";
import { fetchExperiences } from "@/utils/fetchExperience";
import { fetchSkills } from "@/utils/fetchSkills";
import { fetchProjects } from "@/utils/fetchProjects";
import { fetchSocials } from "@/utils/fetchSocials";

type Props = {
    pageInfo: PageInfo;
    experiences: Experience[];
    skills: Skill[];
    projects: Project[];
    socials: Social[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const pageInfo: PageInfo = await fetchPageInfo();
    const experiences: Experience[] = await fetchExperiences();
    const skills: Skill[] = await fetchSkills();
    const projects: Project[] = await fetchProjects();
    const socials: Social[] = await fetchSocials();

    return {
        props: {
            pageInfo,
            experiences,
            skills,
            projects,
            socials,
        },
        revalidate: 10,
    };
};

export default function Home({
    pageInfo,
    experiences,
    skills,
    projects,
    socials,
}: Props) {
    return (
        <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
            <Head>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <title>Elwin's portfolio</title>
            </Head>

            <Header socials={socials} />

            <section id="hero" className="snap-start">
                <Hero pageInfo={pageInfo} />
            </section>

            <section id="about" className="snap-center">
                <About pageInfo={pageInfo}/>
            </section>

            <section id="experience" className="snap-center">
                <WorkExperience experiences={experiences} />
            </section>

            <section id="skills" className="snap-start">
                <Skills skills={skills} />
            </section>

            <section id="projects" className="snap-start">
                <Projects projects={projects}/>
            </section>

            <section id="contact" className="snap-start">
                <ContactMe />
            </section>

            <Link href="#hero">
                <footer className="sticky bottom-5 w-full cursor-pointer">
                    <div className="flex items-center justify-center">
                        <Image
                            className="rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
                            src="/images/avatar.jpg"
                            alt=""
                            height={30}
                            width={30}
                        />
                    </div>
                </footer>
            </Link>
        </div>
    );
}
