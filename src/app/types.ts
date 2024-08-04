import { Document } from "@contentful/rich-text-types";
import { EntrySkeletonType } from "contentful";

export type ExtendedBlogItem = BlogItem & EntrySkeletonType;
 
export type BlogItem = {
    fields: {
        title: string;
        slug: string;
        date: Date;
        content: Document;
        image: {
            file: any;
            fields:{
                title: string;
                description: string;
                file:{
                    url: string;
                    details: object;
                    fileName: string;
                    contentType: string;
                }
            };
        };
        description: string;
    };
};

export type BlogItems = ReadonlyArray<BlogItem>;

export type BlogQueryResult = {
    items: BlogItems;
}

export type paramsdata = {
    params: {
        slug: string;
    }
}