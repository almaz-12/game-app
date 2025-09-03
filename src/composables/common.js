export const findItemById = (data, id) => {
  if (!data) return undefined;
  const array = data.value || data; // Работает и с ref и с обычным массивом
  return array.find(item => item.id === id);
}