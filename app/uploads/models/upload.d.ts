export interface Upload {
  key: string;
  downloadURL?: string;
  data?: any; // custom data 
  meta: {
    name:   string;
    size:   string;
    type:   string;
    date?:  number;
  };
}