const mapping: Record<string, string> = {
  applications: 'application',
  employers: 'employer',
  'job-listings': 'job_listing',
  resumes: 'resume',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
