const commits = [
  {
    hashes: {
      commit: '5fcbfdb998b69bcec729f79f346d34e8f20c642f',
      tree: 'e24d310f713c2d2cb148810782d1bf872220b9f6',
      parents: 'e8438a0217eff657ac47cec2816003c16182b653'
    },
    author: { date: '2017-06-05 17:08:25 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' },
    committer: { date: '2017-06-05 17:08:25 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: 'e8438a0217eff657ac47cec2816003c16182b653',
      tree: '89d9d95db7261ee05d77cea7b93588c923a6cde8',
      parents: '0f2eeef1329333084a158541d80e6fc538462a48'
    },
    author: { date: '2017-06-02 15:02:14 +0400', name: 'Fixer', email: 'fixer@MacBook-Pro-Inna.local' },
    committer: { date: '2017-06-02 15:02:14 +0400', name: 'Fixer', email: 'fixer@MacBook-Pro-Inna.local' }
  },
  {
    hashes: {
      commit: '0f2eeef1329333084a158541d80e6fc538462a48',
      tree: '4d5be8e10ed6ffe87496197b8f9d4adc96652526',
      parents: '7d8835ec29452540b646e192937de2bc1a49cbaf'
    },
    author: { date: '2017-06-02 12:04:06 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' },
    committer: { date: '2017-06-02 12:04:11 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: '7d8835ec29452540b646e192937de2bc1a49cbaf',
      tree: '0b6c1a290ccf6f49dbe624c199c463cfd1cdbbd4',
      parents: '01724ba5aafc3c3a5df3d43d24d7c4d2fdcb7d9c'
    },
    author: { date: '2017-06-01 20:16:37 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' },
    committer: { date: '2017-06-01 20:16:37 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: '01724ba5aafc3c3a5df3d43d24d7c4d2fdcb7d9c',
      tree: 'dc442d86e5bb6c9d84b31ab7d19e0aa649182b50',
      parents: '53797fdfcaa1d06a32f9abd61360fb354ed51929'
    },
    author: { date: '2017-06-01 19:16:30 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' },
    committer: { date: '2017-06-01 19:16:30 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: '53797fdfcaa1d06a32f9abd61360fb354ed51929',
      tree: '4429b5265b2892bab45a732cb1c192310c19409a',
      parents: '41ad84fa675406e30854835b2ebde8aa61e226b6'
    },
    author: { date: '2017-06-01 18:18:11 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' },
    committer: { date: '2017-06-01 18:18:11 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: '41ad84fa675406e30854835b2ebde8aa61e226b6',
      tree: 'b68de5adbeb7a715350edbe5c2abb442d964e7c3',
      parents: 'efaf2871c5e3086482b93aa2c27547a0854e000e'
    },
    author: { date: '2017-05-31 13:00:09 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' },
    committer: { date: '2017-05-31 13:00:09 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: 'efaf2871c5e3086482b93aa2c27547a0854e000e',
      tree: '673f8324d10855d3bdb05621618e910e4a324b19',
      parents: 'd50f88b728a82bb6451e0f07f1c53842c8b9aec1'
    },
    author: { date: '2017-05-26 16:30:33 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' },
    committer: { date: '2017-05-26 16:30:33 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'd50f88b728a82bb6451e0f07f1c53842c8b9aec1',
      tree: '08645fe39119091fa71bf0d1e72d65d6ed794851',
      parents: '76708c336be8e3b094d963ce68ff5680bdd82866'
    },
    author: { date: '2017-05-24 20:12:48 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' },
    committer: { date: '2017-05-24 20:12:48 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: '76708c336be8e3b094d963ce68ff5680bdd82866',
      tree: '41329061b2487c4a12efc8dbff2f02c3699d7576',
      parents: '3d32a13255de9b37c5b0b568619d1eeebf5ab06d'
    },
    author: { date: '2017-05-24 19:58:58 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' },
    committer: { date: '2017-05-24 19:58:58 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: '3d32a13255de9b37c5b0b568619d1eeebf5ab06d',
      tree: 'a2b3be4c19c172c584025838dfe10ee25606564c',
      parents: 'f718b0207ca5212f728dd2b879d0a6515976e470'
    },
    author: { date: '2017-05-24 19:49:39 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' },
    committer: { date: '2017-05-24 19:49:39 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'f718b0207ca5212f728dd2b879d0a6515976e470',
      tree: '0bb23996d6d1ff31dcdfb8b45e7d013955f99c84',
      parents: ''
    },
    author: { date: '2017-05-24 15:22:56 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' },
    committer: { date: '2017-05-24 15:22:56 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  }
] //.reverse()

const branchIndex = [0]
const reserve = []
const branches = {}

const getBranch = sha => {
  if (!branches[sha]) {
    branches[sha] = branchIndex[0]
    reserve.push(branchIndex[0])
    branchIndex[0] += 1
  }
  return branches[sha]
}

const nodes = commits.map(commit => {
  const branch = getBranch(commit.hashes.commit)
  const parents = commit.hashes.parents.split(' ')
  const offset = reserve.indexOf(branch)
  const routes = []

  if (parents.length === 1) {
    if (branches[parents[0]] != null) {
      // create branch
      const iterable = reserve.slice(offset + 1)
      for (let i = 0; i < iterable.length; i++) {
        routes.push([i + offset + 1, i + offset + 1 - 1, iterable[i]])
      }
      const iterable1 = reserve.slice(0, offset)
      for (let i = 0; i < iterable1.length; i++) {
        routes.push([i, i, iterable1[i]])
      }

      reserve.splice(reserve.indexOf(branch), 1)

      routes.push([offset, reserve.indexOf(branches[parents[0]]), branch])
    } else {
      // straight
      for (let i = 0; i < reserve.length; i++) {
        routes.push([i, i, reserve[i]])
      }
      branches[parents[0]] = branch
    }
  } else if (parents.length === 2) {
    // merge branch
    branches[parents[0]] = branch
    for (let i = 0; i < reserve.length; i++) {
      routes.push([i, i, reserve[i]])
    }
    const otherBranch = getBranch(parents[1])
    routes.push([offset, reserve.indexOf(otherBranch), otherBranch])
  }

  return { sha: commit.hashes.commit, offset, branch, routes }
})

console.log(JSON.stringify(nodes))
