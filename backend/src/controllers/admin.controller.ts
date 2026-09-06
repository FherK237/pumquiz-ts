import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AppError } from '../utils/errors';

export async function uploadTriviaHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const trivia = await prisma.trivia.create({
      data: {
        title: req.body.title,
        category: req.body.category,
        difficulty: req.body.difficulty,
        type: 'OFFICIAL',
        createdBy: req.userId!,
        questions: {
          create: req.body.questions.map((q: any) => ({
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation || null,
          })),
        },
      },
      include: { questions: true },
    });

    res.status(201).json(trivia);
  } catch (err) {
    next(err);
  }
}

export async function deleteTriviaHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const trivia = await prisma.trivia.findUnique({ where: { id } });
    if (!trivia) {
      throw new AppError('Trivia not found', 404);
    }

    await prisma.trivia.delete({ where: { id } });

    res.status(200).json({ message: 'Trivia deleted successfully' });
  } catch (err) {
    next(err);
  }
}
