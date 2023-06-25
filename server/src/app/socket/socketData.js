Map.prototype.getKeyByValue = function (searchValue) {
  for (const [key, value] of this) if (value === searchValue) return key;
  return undefined;
};

const activeConversations = new Map();
const activeUsers = new Map();

module.exports = {
  activeConversations,
  activeUsers,
};
