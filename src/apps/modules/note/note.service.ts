/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import {
  IPost,
  ISearchUser,
  PostDocument,
  userSearchableFields,
} from './note.interface';

import { NoteModel } from './note.model';
import { IPaginationOpton } from '../../../interfaces/pagination';
import { IGenaricRespons } from '../../../interfaces/common';
import { HelperPagination } from '../../../helpers/paginationHelper';

// Create a Post business logic
const createPost = async (post: IPost): Promise<PostDocument | null> => {
  const postToCreate = post;

  const created = await NoteModel.create(postToCreate);

  if (!created) {
    throw new ApiError(500, 'post creation failed', '');
  }

  return created as PostDocument;
};

const getAllPost = async (
  filtering: Record<string, any>,
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<ISearchUser[]> | null> => {
  const { searchTerm, ...filtersData } = filtering;

  const searchTermString =
    typeof searchTerm === 'string' ? searchTerm.trim() : '';

  const andConditions: Record<string, any>[] = [];

  if (searchTermString) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTermString,
          $options: 'i',
        },
      })),
    });
  }

  const validFilters = Object.entries(filtersData).filter(
    ([_, value]) => value !== undefined && value !== null && value !== ''
  );

  if (validFilters.length) {
    andConditions.push({
      $and: validFilters.map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculationPagination(paginationOption);

  const sortConditions: Record<string, 1 | -1> = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await NoteModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await NoteModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const updatePost = async (
  id: string,
  user: Partial<IPost>
): Promise<IPost | null> => {
  const existingUser = await NoteModel.findById(id);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found', '');
  }

  // allowed fields based on schema
  const allowedFields: (keyof IPost)[] = ['title', 'content'];

  const updateData: Partial<IPost> = {};

  allowedFields.forEach(field => {
    const value = user[field];
    if (value !== undefined && value !== null) {
      updateData[field] = value as any;
    }
  });

  const updatedUser = await NoteModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post update failed', '');
  }

  return updatedUser;
};

const deleteSingelPost = async (id: string): Promise<void> => {
  const users = await NoteModel.findById(id);
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found', '');
  }

  await NoteModel.findByIdAndDelete(id);
};

export const PostServices = {
  createPost,
  getAllPost,
  updatePost,
  deleteSingelPost,
};
