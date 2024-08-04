import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { createClient } from 'contentful';
import Header from '@/app/header';
import { BlogItem, ExtendedBlogItem } from '@/app/types';
import Footer from '@/app/footer';

type BlogPageProps = {
  params: {
    slug: string;
    content: Document
  }
}

const client = createClient({
  space: process.env.SPACE_ID as string,
  accessToken: process.env.ACCESS_TOKEN as string
})

export async function generateStaticParams() {
  const queryOption ={
    content_type: "blog",
    select: 'fields.slug',
  };

  const articles = await client.getEntries(queryOption)
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}

const fetchBlogPost = async (slug: string): Promise<BlogItem> => {
  const queryOptions = {
    content_type: "blog",
    "fields.slug[match]": slug,
  };

  const queryResult = await client.getEntries<ExtendedBlogItem>(queryOptions);
  return queryResult.items[0];
}

async function BlogPage(props: BlogPageProps) {
  const { params } = props;
  const { slug } = params; 

  const article = await fetchBlogPost(slug);
  const { title, date, description, content, image } = article.fields;  

  return (
    <>
      <Header/>
      <div className="bg-white flex min-h-screen justify-center">
        <main className="bg-white max-w-7xl flex min-h-screen items-center">
            <div  className="justify-items-center" style={{maxWidth:"1000px"}}>
              <h1 className="font-extrabold text-3xl mb-2">{title}</h1><br/>
              <p className="mb-6 text-slate-400 ">
                Posted on{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="max--2xl">
                {documentToReactComponents(content)}            
              </div> 
            </div>
          </main>
      </div>
      <Footer></Footer>
    </>
  )
}

export default BlogPage

