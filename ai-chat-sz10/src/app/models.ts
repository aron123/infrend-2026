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

export interface ChatCompletion {
    candidates: Candidate[];
}

export interface Candidate {
    content: Content;
}