import { Data, getDbContext } from "./lowdb";

const getCollection = (collectionName: keyof Data) => {
  return getDbContext()?.data?.[collectionName];
};

export const generateIdForNewCollectionItem = (
  collectionName: keyof Data
): string => {
  const itemsIdsInCollection = getDbContext()?.data?.[collectionName].map(
    (item) => Number(item.id)
  );
  return !itemsIdsInCollection
    ? "1"
    : (Math.max(...itemsIdsInCollection) + 1).toString();
};

export default getCollection;
