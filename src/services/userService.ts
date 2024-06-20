import { db } from "../database";
import { hashPassword } from "../utils/passwordUtils";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
}

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: CreateUserDTO): Promise<User> => {
  const hashedPassword = password;

  const [newUser] = await db('users').insert({
    name,
    email,
    password: hashedPassword,
    balance: 0
  }).returning('*');

  return newUser;
};

export const fundAccount = async (userId: number, amount: number): Promise<User> => {
  const updatedUser = await db.transaction(async trx => {
    const user = await trx('users').where('id', userId).first();

    if (!user) {
      throw new Error('User not found');
    }

    const newBalance = user.balance + amount;

    await trx('users')
      .where('id', userId)
      .update({ balance: newBalance });

    const [updatedUser] = await trx('users').where('id', userId).select('*');
    return updatedUser;
  });

  return updatedUser;
};

export const transferFunds = async (fromUserId: number, toUserId: number, amount: number): Promise<{ fromUser: User, toUser: User }> => {
  const result = await db.transaction(async trx => {
    const fromUser = await trx('users').where('id', fromUserId).first();
    const toUser = await trx('users').where('id', toUserId).first();

    if (!fromUser) {
      throw new Error('Sender not found');
    }

    if (!toUser) {
      throw new Error('Recipient not found');
    }

    if (fromUser.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const newFromUserBalance = fromUser.balance - amount;
    const newToUserBalance = toUser.balance + amount;

    await trx('users')
      .where('id', fromUserId)
      .update({ balance: newFromUserBalance });

    await trx('users')
      .where('id', toUserId)
      .update({ balance: newToUserBalance });

    const [updatedFromUser] = await trx('users').where('id', fromUserId).select('*');
    const [updatedToUser] = await trx('users').where('id', toUserId).select('*');

    return {
      fromUser: updatedFromUser,
      toUser: updatedToUser
    };
  });

  return result;
};

export const withdrawFunds = async (userId: number, amount: number): Promise<User> => {
  const updatedUser = await db.transaction(async trx => {
    const user = await trx('users').where('id', userId).first();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const newBalance = user.balance - amount;

    await trx('users')
      .where('id', userId)
      .update({ balance: newBalance });

    const [updatedUser] = await trx('users').where('id', userId).select('*');
    return updatedUser;
  });

  return updatedUser;
};