export type Book = {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    file: string;
    authorName: string;
};

export type Researchpaper = {
    _id: string;
    title: string;
    field: string;
    abstract: string;
    coverImage: string;
    file: string;
    authorName: string;
}

export type Author = {
    name: string;
};
