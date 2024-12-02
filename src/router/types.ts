export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    permissions?: string[];
  };
} 