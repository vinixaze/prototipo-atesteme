export interface Content {
  id: string;
  title: string;
  competency: string;
  level: number;
  category: string;
  categoryColor: string;
  format: string;
  description: string;
  link: string;
}

export interface Category {
  name: string;
  color: string;
  icon: any;
}

