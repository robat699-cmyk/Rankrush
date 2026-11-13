export const Models = {
  ranking: {
    create: async () => ({ id: 'mock-ranking' }),
    findHistoryByKeyword: async () => []
  },
  keyword: {
    findByProjectAndKeyword: async () => ({ id: 'mock-keyword' }),
    findAllByProject: async () => []
  },
  backlink: {
    findAllByProject: async () => [],
    create: async () => ({ id: 'mock-backlink' })
  },
  project: {
    findById: async () => ({ competitor_domains: [] })
  }
};
