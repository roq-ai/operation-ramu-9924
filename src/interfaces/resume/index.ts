import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ResumeInterface {
  id?: string;
  content: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ResumeGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  user_id?: string;
}
