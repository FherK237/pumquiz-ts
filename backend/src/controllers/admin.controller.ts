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

export async function updateTriviaHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;

    const existing = await prisma.trivia.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError('Trivia not found', 404);
    }

    const { title, category, difficulty, questions } = req.body;

    const data: any = {};
    if (title !== undefined) data.title = title;
    if (category !== undefined) data.category = category;
    if (difficulty !== undefined) data.difficulty = difficulty;

    // Update metadata (and questions, if provided) in a single transaction.
    const trivia = await prisma.$transaction(async (tx) => {
      if (Object.keys(data).length > 0) {
        await tx.trivia.update({ where: { id }, data });
      }

      if (questions !== undefined) {
        // Questions carrying an id are updated in place (id preserved).
        // Questions without an id are treated as new and created.
        for (const q of questions as any[]) {
          if (q.id) {
            await tx.question.update({
              where: { id: q.id },
              data: {
                question: q.question,
                options: q.options,
                correctIndex: q.correctIndex,
                explanation: q.explanation ?? null,
              },
            });
          } else {
            await tx.question.create({
              data: {
                triviaId: id,
                question: q.question,
                options: q.options,
                correctIndex: q.correctIndex,
                explanation: q.explanation ?? null,
              },
            });
          }
        }
      }

      return tx.trivia.findUnique({
        where: { id },
        include: { questions: true },
      });
    });

    res.status(200).json(trivia);
  } catch (err) {
    next(err);
  }
}

export async function updateQuestionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const questionId = req.params.questionId as string;

    const existing = await prisma.question.findUnique({ where: { id: questionId } });
    if (!existing) {
      throw new AppError('Question not found', 404);
    }

    const { question, options, correctIndex, explanation } = req.body;

    const data: any = {};
    if (question !== undefined) data.question = question;
    if (options !== undefined) data.options = options;
    if (correctIndex !== undefined) data.correctIndex = correctIndex;
    if (explanation !== undefined) data.explanation = explanation;

    const updated = await prisma.question.update({
      where: { id: questionId },
      data,
    });

    res.status(200).json(updated);
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
