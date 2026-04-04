import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import { PageInfo, Experience, Skill, Project, Social } from "@/typings";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

type Props = {
    pageInfo: PageInfo;
    experiences: Experience[];
    skills: Skill[];
    projects: Project[];
    socials: Social[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const pageInfo: PageInfo = await sanityClient.fetch(
        groq`*[_type=="pageInfo"][0]`
    );

    const experiences: Experience[] = await sanityClient.fetch(
        groq`*[_type=="experience"]{..., technologies[]->}`
    );

    const skills: Skill[] = await sanityClient.fetch(
        groq`*[_type == "skill"]`
    );

    const projects: Project[] = await sanityClient.fetch(
        groq`*[_type=="project"]{..., technologies[]->}`
    );

    const socials: Social[] = await sanityClient.fetch(
        groq`*[_type == "social"]`
    );

    return {
        props: { pageInfo, experiences, skills, projects, socials },
        revalidate: 10,
    };
};

export default function Home({ pageInfo, experiences, skills, projects, socials }: Props) {
    return (
        <div className="bg-cream text-ink min-h-screen">
            <Head>
                <title>Elwin Chiong — AI Systems Engineer</title>
                <meta name="description" content="AI Systems Engineer building LLM pipelines, cloud infrastructure, and production AI tools. Open to roles at Google, Meta, OpenAI, Anthropic." />
            </Head>

            <Header socials={socials} />

            <main>
                <section id="hero">
                    <Hero pageInfo={pageInfo} projects={projects} />
                </section>

                <section id="work">
                    <Work projects={projects} />
                </section>

                <section id="skills">
                    <Skills skills={skills} />
                </section>

                <section id="experience">
                    <WorkExperience experiences={experiences} />
                </section>

                <section id="about">
                    <About pageInfo={pageInfo} />
                </section>

                <section id="contact">
                    <ContactMe pageInfo={pageInfo} />
                </section>
            </main>
        </div>
    );
}
