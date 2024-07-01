import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { startOfDay, endOfDay } from 'date-fns';

import { prisma } from '@/lib/prisma-client';

// POST /api/quiz/submit/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  // console.log('userId', userId);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  // if (!user) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = req.headers['x-api-key'];

  console.log(apiKey, apiKey !== process.env.API_SECRET_KEY, req);

  const seed = req.body.seed;
  const name = req.body.name;
  const cardsSchema = z.array(z.string());
  const cards = cardsSchema.parse(req.body.cards);

  if (!cards) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  if (!seed) {
    return res.status(400).json({ error: 'Bad Request' });
  }
  //   if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }

  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  // 检查是否存在今天创建的记录
  const existingRecord = await prisma.userSetUp.findFirst({
    where: {
      userid: user?.id || 'Anonymous',
      seed: seed,
      createdat: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  // 如果存在，则不创建新记录，直接返回存在的记录
  if (existingRecord) {
    return res.status(200).json(existingRecord);
  }

  const result = await prisma.userSetUp.create({
    data: {
      seed: seed,
      rating: 5,
      data: {
        cards: cards,
      },
      title: '',
      content: '',
      likes: 0,
      userid: user?.id || 'Anonymous',
      // user: { connect: { id: user.id, name: authorName } },
      userinfo: {
        username: user?.username || 'Anonymous',
        imageUrl: user?.imageUrl || name,
      },
    },
  });

  // total += 1
  const result2 = await prisma.setUp.updateMany({
    where: {
      seed: seed,
    },
    data: {
      total: {
        increment: 1,
      },
    },
  });
  return res.status(201).json(result);
}
