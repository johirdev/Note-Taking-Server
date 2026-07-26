// import { Schema, model } from 'mongoose';

import { Model } from 'mongoose';

export const INTERESTS = [
  'tech',
  'programming',
  'frontend',
  'backend',
  'fullstack',
  'ai',
  'gaming',
  'movies',
  'music',
  'news',
  'business',
  'crypto',
  'football',
  'cricket',
  'fitness',
  'education',
  'books',
  'travel',
  'food',
  'career',
  'freelancing',
];

// Created User Modal-Schema property inferface
export type IUser = {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | string;
  interests: string[];
};
export type IUserLogin = {
  access_token?: string;
  refresh_token?: string;
};
export type ISearchUser = {
  name?: string;
  email?: string;
  role?: string;
};
export type IupdateRuler = {
  ruler: string;
};
export const userSearchableFields = ['name', 'role'];

export type UserModel = Model<IUser, Record<string, unknown>>;
