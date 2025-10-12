import { Prisma } from '@prisma/client';

export const QUERY_FIND_TOP_TRAINERS = Prisma.sql`
    SELECT u.id , u.name, u.email, COUNT(a.id) as countAssignment
    FROM Users u
    JOIN Assignments a ON u.id = a.userId
    -- WHERE u.role = 'ADMIN' AND a.status = 'FINISH'
    GROUP BY u.id
    ORDER BY countAssignment DESC
    LIMIT 3
  `;

export type QueryFindTopTrainers = {
  id: number;
  name: string;
  email: string;
  countAssignment: bigint;
};
