export interface Profile {
  username: string;
  email: string;
}

export interface AuthToken {
  auth_token: string;
}

export interface Me {
  id: string;
  email: string;
}

export interface Pet {
  id: string;
  name: string;
  image: string;
  gender: string;
  birthday: string;
  welcome_day: string;
  share_id: string;
  is_heaven: string;
}

export interface CareCategory {
  id: string;
  name: string;
  icon: string;
  input_type: string;
  unit: string;
  is_daily_routine: boolean;
  user: string;
}

export interface CareLog {
  id: string;
  name: string;
  icon: string;
  input_type: string;
  unit: string;
  is_daily_routine: string;
  user: string;
}

export interface Blog {
  id: string;
  pet: {
    id: string;
    name: string;
    image: string | null;
    gender: string;
    birthday: string;
    welcome_day: string;
    share_id: string;
    is_heaven: boolean;
    created_at: string;
    updated_at: string;
    category: number;
    owners: number[];
  };
  title: string | null;
  content: string;
  image: string | null;
  is_published: boolean;
  publish_date_time: string | null;
  create_user: string | null;
  update_user: string | null;
}
