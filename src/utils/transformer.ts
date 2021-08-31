import { Op } from 'sequelize';

/**
 * Allows usage of wildcards for strings in query params
 *
 * @param query
 * @returns
 */
export const transformQueryWildcardParams = (query) => {
  if (!query) return null;
  const result = {};
  Object.keys(query).forEach((key) => {
    result[key] = { [Op.substring]: query[key] };
  });
  return result;
};
