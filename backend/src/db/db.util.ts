import { Data, getDbContext } from "./lowdb";

const getCollection = (collectionName: keyof Data) => {
  return getDbContext()?.data?.[collectionName];
};

export const generateIdForNewCollectionItem = (
  collectionName: keyof Data
): string => {
  const collection = getCollection(collectionName);

  const itemsIdsInCollection = collection
    ?.map((item) => Number(item.id))
    .filter((id) => !isNaN(id));

  if (!itemsIdsInCollection || itemsIdsInCollection.length == 0) {
    return "1";
  }

  return (Math.max(...itemsIdsInCollection) + 1).toString();
};

export default getCollection;
