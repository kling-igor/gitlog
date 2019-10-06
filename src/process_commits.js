const commits = [
  {
    hashes: {
      commit: 'L',
      parents: 'K J'
    },
    author: { date: '2017-06-06 17:53:20 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: 'K',
      parents: 'H I'
    },
    author: { date: '2017-06-06 17:49:18 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: 'J',
      parents: 'H'
    },
    author: { date: '2017-06-06 17:44:42 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: 'I',
      parents: 'G'
    },
    author: { date: '2017-06-06 16:13:11 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'H',
      parents: 'G'
    },
    author: { date: '2017-06-06 16:11:34 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: 'G',
      parents: 'F'
    },
    author: { date: '2017-06-06 15:15:10 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'F',
      parents: 'E D'
    },
    author: { date: '2017-06-05 18:30:46 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'E',
      parents: 'D'
    },
    author: { date: '2017-06-05 18:30:43 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'D',
      parents: 'C'
    },
    author: { date: '2017-06-05 18:24:23 +0400', name: 'Андрей Парваткин', email: 'parvatkinaa@altarix.ru' }
  },
  {
    hashes: {
      commit: 'C',
      parents: 'B'
    },
    author: { date: '2017-05-24 19:58:58 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'B',
      parents: 'A'
    },
    author: { date: '2017-05-24 19:49:39 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
  },
  {
    hashes: {
      commit: 'A',
      parents: ''
    },
    author: { date: '2017-05-24 15:22:56 +0400', name: 'Alexey Sadykov', email: 'alexey.sadykov@altarix.ru' }
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
  console.log(`**** COMMIT ${commit.hashes.commit} ****`)

  const branch = getBranch(commit.hashes.commit)
  console.log('branch:', branch)
  const parents = (commit.hashes.parents && commit.hashes.parents.split(' ')) || []
  console.log('parents:', parents)
  const offset = reserve.indexOf(branch)
  console.log('offset:', offset)

  const routes = []

  console.log('has parents:', parents.length)
  if (parents.length === 1) {
    if (branches[parents[0]] != null) {
      // create branch
      const iterable = reserve.slice(offset + 1)
      for (let i = 0; i < iterable.length; i++) {
        routes.push([i + offset + 1, i + offset + 1 - 1 /*, iterable[i]*/])
      }
      const iterable1 = reserve.slice(0, offset)
      for (let i = 0; i < iterable1.length; i++) {
        routes.push([i, i /*, iterable1[i]*/])
      }

      reserve.splice(reserve.indexOf(branch), 1)

      routes.push([offset, reserve.indexOf(branches[parents[0]]) /*, branch*/])
    } else {
      // straight
      for (let i = 0; i < reserve.length; i++) {
        routes.push([i, i /*, reserve[i]*/])
      }
      branches[parents[0]] = branch
    }
  } else if (parents.length === 2) {
    // merge branch
    branches[parents[0]] = branch
    for (let i = 0; i < reserve.length; i++) {
      routes.push([i, i /*, reserve[i]*/])
    }
    const otherBranch = getBranch(parents[1])
    routes.push([offset, reserve.indexOf(otherBranch) /*, otherBranch*/])
  }

  const node = { sha: commit.hashes.commit, offset, branch, routes }
  console.log('node:', JSON.stringify(node))

  return node
})
