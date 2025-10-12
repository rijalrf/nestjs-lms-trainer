import { Prisma } from '@prisma/client';

export const QUERY_FIND_TOPIC_POPULARS = Prisma.sql`
    SELECT t.title, t.description, COUNT(a.id) as countAssignment
    FROM Topics t
    INNER JOIN Assignments a ON t.id = a.topicId    
    WHERE a.status = 'FINISH'    
    GROUP BY t.id
    ORDER BY countAssignment DESC
    LIMIT 3
    `;
