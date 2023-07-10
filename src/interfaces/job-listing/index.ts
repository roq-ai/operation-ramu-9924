import { ApplicationInterface } from 'interfaces/application';
import { EmployerInterface } from 'interfaces/employer';
import { GetQueryInterface } from 'interfaces';

export interface JobListingInterface {
  id?: string;
  title: string;
  description: string;
  requirements: string;
  employer_id?: string;
  created_at?: any;
  updated_at?: any;
  application?: ApplicationInterface[];
  employer?: EmployerInterface;
  _count?: {
    application?: number;
  };
}

export interface JobListingGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  requirements?: string;
  employer_id?: string;
}
