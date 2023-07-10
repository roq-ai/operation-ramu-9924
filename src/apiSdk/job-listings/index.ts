import axios from 'axios';
import queryString from 'query-string';
import { JobListingInterface, JobListingGetQueryInterface } from 'interfaces/job-listing';
import { GetQueryInterface } from '../../interfaces';

export const getJobListings = async (query?: JobListingGetQueryInterface) => {
  const response = await axios.get(`/api/job-listings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createJobListing = async (jobListing: JobListingInterface) => {
  const response = await axios.post('/api/job-listings', jobListing);
  return response.data;
};

export const updateJobListingById = async (id: string, jobListing: JobListingInterface) => {
  const response = await axios.put(`/api/job-listings/${id}`, jobListing);
  return response.data;
};

export const getJobListingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/job-listings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJobListingById = async (id: string) => {
  const response = await axios.delete(`/api/job-listings/${id}`);
  return response.data;
};
