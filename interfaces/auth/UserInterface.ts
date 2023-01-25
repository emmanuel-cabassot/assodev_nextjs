interface UserInterface {
    id: string;
    surname : string;
    email: string;
    password: string;
    role: string;
    profileImage?: any;
    refresh_token?: string;
    
  }

  export type { UserInterface };