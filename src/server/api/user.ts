import { User as PrismaUser } from '@prisma/client';

export type User = Pick<PrismaUser, 'email' | 'avatar' | 'name' | 'id'>;

export const userSelect = { avatar: true, email: true, id: true, name: true };
