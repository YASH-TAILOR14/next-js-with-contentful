import { createClient } from "contentful";
import { BlogQueryResult, ExtendedBlogItem } from "./types";
import Header from "./header";
import Link from "next/link";
import Footer from "./footer";
 
const client = createClient({

  space: process.env.SPACE_ID as string,
  accessToken: process.env.ACCESS_TOKEN as string,
});

const getBlogEntries = async (): Promise<BlogQueryResult> => {
  const entries = await client.getEntries<ExtendedBlogItem>({ content_type: "blog"});  
  return entries;
}
 
export default async function Home() {

  const blogEntries = await getBlogEntries();

  return(
    <>
    <Header />        
      <div className="bg-white flex min-h-screen justify-center">
        <main className="bg-white grid max-w-7xl flex min-h-screen md:grid-cols-3 items-center p-6">
            {blogEntries.items.map((post) =>{
            const { slug, title, date, image, content, description } = post.fields;
              return (
                <>
                  <div key={slug} className=" justify-between px-4 sm:px-6 lg:px-8">
                    <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8">
                      <Link className="group justify-center" href={`/articles/${slug}`} >
                          <img className="shadow hover:shadow-2xl rounded-md"
                            src={image.fields.file.url}
                            alt={image.fields.file.fileName}
                            width={500}
                            height={500}
                          />
                        <div className="flex justify-between">                          
                            <p className="text-sm pt-4 font-semibold">
                              {title}
                            </p>
                            <p className="text-sm pt-4 text-gray-900">
                              {new Date(date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>                                                       
                        </div>
                        <div>                                                  
                          <p className="underline pt-2 text-sm font-semibold group-hover:text-blue-500 transition-colors text-gray-900"> Read More <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg></p>
                        </div>
                      </Link>             
                    </div>
                  </div>              
                </>    
              );
            })}
        </main>        
      </div>
      <Footer></Footer>
    </>
  );
}
