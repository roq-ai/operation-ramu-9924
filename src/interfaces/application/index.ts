import { JobListingInterface } from 'interfaces/job-listing';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  status: string;
  job_listing_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  job_listing?: JobListingInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  job_listing_id?: string;
  user_id?: string;
}
