import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { checkKarmaBlacklist } from '../services/adjutorService';

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const isBlacklisted = await checkKarmaBlacklist(email);
    if (isBlacklisted) {
      return res.status(403).json({ message: 'User is blacklisted and cannot be onboarded' });
    }

    const user = await userService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const fundAccount = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    const updatedUser = await userService.fundAccount(userId, amount);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const transferFunds = async (req: Request, res: Response) => {
  const { fromUserId, toUserId, amount } = req.body;

  try {
    const result = await userService.transferFunds(fromUserId, toUserId, amount);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const withdrawFunds = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    const updatedUser = await userService.withdrawFunds(userId, amount);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export default {
  createUser,
  fundAccount,
  transferFunds,
  withdrawFunds,
};