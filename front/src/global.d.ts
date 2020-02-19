declare namespace App {
  export interface Tag {
    name: string;
    color: string;
  }
  export interface Tags {
    [tagName: string]: { name: string; color: string };
  }
}
