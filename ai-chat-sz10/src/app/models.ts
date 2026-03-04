export interface ChatHistory {
    contents: Content[];
}

export interface Content {
    role: 'user'|'model';
    parts: Part[];
}

export interface Part {
    text: string;
}