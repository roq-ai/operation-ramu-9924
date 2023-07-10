import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { employerValidationSchema } from 'validationSchema/employers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEmployers();
    case 'POST':
      return createEmployer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmployers() {
    const data = await prisma.employer
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'employer'));
    return res.status(200).json(data);
  }

  async function createEmployer() {
    await employerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.job_listing?.length > 0) {
      const create_job_listing = body.job_listing;
      body.job_listing = {
        create: create_job_listing,
      };
    } else {
      delete body.job_listing;
    }
    const data = await prisma.employer.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
