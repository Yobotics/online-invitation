export interface WeddingDetails {
  couple: [string, string];
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
  };
  musicUrl: string;
}

export interface WeddingTemplateProps {
  weddingDetails: WeddingDetails;
}

export type TemplateType = 'classic' | 'elegant';