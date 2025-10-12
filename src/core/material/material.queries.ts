import { Prisma } from '@prisma/client';

export const QUERY_FIND_MATERIAL_POPULARS = Prisma.sql`
      SELECT m.title, m.description, COUNT(a.id) as countAssignment
      FROM Materials m
      JOIN Assignments a ON m.id = a.materialId
      WHERE a.status = 'FINISH'
      GROUP BY m.id
      ORDER BY countAssignment DESC
      LIMIT 3
    `;
