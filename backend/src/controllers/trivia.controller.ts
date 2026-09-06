import { Request, Response, NextFunction } from 'express';
import * as triviaService from '../services/trivia.service';
import { Difficulty } from '@prisma/client';

export async function listTriviasHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const category = req.query.category as string | undefined;
    const difficulty = req.query.difficulty as Difficulty | undefined;

    const trivias = await triviaService.listTrivias({ category, difficulty });
    res.status(200).json(trivias);
  } catch (err) {
    next(err);
  }
}

export async function getTriviaByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const trivia = await triviaService.getTriviaById(id);
    res.status(200).json(trivia);
  } catch (err) {
    next(err);
  }
}

export async function getQuestionsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const questions = await triviaService.getQuestions(id);
    res.status(200).json(questions);
  } catch (err) {
    next(err);
  }
}
