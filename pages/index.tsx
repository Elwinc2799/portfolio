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

                {/* Favicon */}
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

                {/* OpenGraph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://portfolio-elwinc2799.vercel.app/" />
                <meta property="og:title" content="Elwin Chiong — AI Systems Engineer" />
                <meta property="og:description" content="AI Systems Engineer building LLM pipelines, cloud infrastructure, and production AI tools. Open to roles at Google, Meta, OpenAI, Anthropic." />
                <meta property="og:site_name" content="Elwin Chiong Portfolio" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Elwin Chiong — AI Systems Engineer" />
                <meta name="twitter:description" content="AI Systems Engineer building LLM pipelines, cloud infrastructure, and production AI tools." />

                {/* Additional SEO */}
                <meta name="author" content="Elwin Chiong" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="https://portfolio-elwinc2799.vercel.app/" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Elwin Chiong",
                            "jobTitle": "AI Systems Engineer",
                            "url": "https://portfolio-elwinc2799.vercel.app/",
                            "sameAs": [
                                "https://github.com/Elwinc2799",
                                "https://linkedin.com/in/elwin-chiong-3602b5222/"
                            ],
                            "knowsAbout": [
                                "Artificial Intelligence",
                                "Machine Learning",
                                "LLM Pipelines",
                                "Cloud Infrastructure",
                                "Python",
                                "TypeScript"
                            ]
                        })
                    }}
                />
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
