declare namespace App {
  export interface Tag {
    name: string;
    color: string;
  }
  export interface Techno {
    id: string;
    title: string;
    tags: string[];
    imgUrl: string;
    desc: string;
    type: string;
  }
  export interface Tags {
    [tagName: string]: { name: string; color: string };
  }
}
