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
  is_daily_routine: string;
  user: string;
}
