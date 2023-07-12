export interface Results {
    data:  Data[];
    links: Links;
    meta:  Meta;
}

export interface Result {
    data:  Data;
    links: Links;
    meta:  Meta;
}

export interface Data {
    id:          string;
    name:        string;
    total:       number;
    budget:      number;
    description: string;
    is_active:   boolean;
    deleted_at:  null;
    created_at:  Date;
    updated_at:  Date;
}

export interface Links {
    first: string;
    last:  string;
    prev:  null;
    next:  string;
}

export interface Meta {
    current_page: number;
    from:         number;
    last_page:    number;
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}