export type CommunityItem = {
  slug: string;
  name: string;
  bio: string;
  styles: string[];
  tags: string[];
  approved: true;
};
export type CommunityData = {
  status: 'ready' | 'error';
  items: CommunityItem[];
  portal: string;
  page: number;
};
