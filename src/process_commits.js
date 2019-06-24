// const _commits = [
//   [
//     'e0d173f9d2ece40cc21319bb9e8ee1c934a997d4',
//     ['c4c0cbffb08e0ff69bf3289a12774a5c49e32f28', '0b277977ed6ea0a4a4adcf57bcfd420ed75a679c']
//   ],
//   [
//     '0b277977ed6ea0a4a4adcf57bcfd420ed75a679c',
//     ['5a3b3fd85225695d801eae1f2508cb5bf6caa56a', 'c4c0cbffb08e0ff69bf3289a12774a5c49e32f28']
//   ],
//   [
//     'c4c0cbffb08e0ff69bf3289a12774a5c49e32f28',
//     ['8a87915da94c7eb8f348291d7c7e102fa6d041f4', 'f3c22d7490f391d2cfebf7096ba6f56c01695425']
//   ],
//   ['f3c22d7490f391d2cfebf7096ba6f56c01695425', ['e8e3240365210045b99e1616fce021e954c54c6c']],
//   [
//     '8a87915da94c7eb8f348291d7c7e102fa6d041f4',
//     ['e8e3240365210045b99e1616fce021e954c54c6c', '7155f00eb096820f209bca7ddfd310df101561ae']
//   ],
//   ['7155f00eb096820f209bca7ddfd310df101561ae', ['e8e3240365210045b99e1616fce021e954c54c6c']],
//   ['5a3b3fd85225695d801eae1f2508cb5bf6caa56a', ['e8e3240365210045b99e1616fce021e954c54c6c']],
//   [
//     'e8e3240365210045b99e1616fce021e954c54c6c',
//     ['30d6af421b202f5162951f52424733140ccd02b9', 'af94fec43f3b4f242c30863e22618e04a12aa909']
//   ],
//   ['af94fec43f3b4f242c30863e22618e04a12aa909', ['e2fc5947d12f2e52c7f975de6de25d3c753822c8']],
//   ['e2fc5947d12f2e52c7f975de6de25d3c753822c8', ['30d6af421b202f5162951f52424733140ccd02b9']],
//   [
//     '30d6af421b202f5162951f52424733140ccd02b9',
//     ['08306420435b990de013f051a28efec2810cf0eb', '2f5b2df082fc5bdd6acd72e57a833d508d51eb55']
//   ],
//   ['2f5b2df082fc5bdd6acd72e57a833d508d51eb55', ['08306420435b990de013f051a28efec2810cf0eb']],
//   [
//     '08306420435b990de013f051a28efec2810cf0eb',
//     ['c798b2fedb2e6aad7c92f9edfe85b1dda2954c94', '60a72365cfedc932c66527df34c6bdd8a2e8057a']
//   ],
//   ['60a72365cfedc932c66527df34c6bdd8a2e8057a', ['371e598b83a6cee023d9cb5597f25732cc2d3986']],
//   ['371e598b83a6cee023d9cb5597f25732cc2d3986', ['c798b2fedb2e6aad7c92f9edfe85b1dda2954c94']],
//   [
//     'c798b2fedb2e6aad7c92f9edfe85b1dda2954c94',
//     ['fb9d6bbb5e07426913176523b216e0431095b38c', '964975c951ce0e9a8b1be72b90bf298b6bf9694e']
//   ],
//   [
//     '964975c951ce0e9a8b1be72b90bf298b6bf9694e',
//     ['5d3fa4c6800330d91ac66142699247457bbc3d74', '891c406f69190bb835b0fae68383c5772e593cb0']
//   ],
//   [
//     'fb9d6bbb5e07426913176523b216e0431095b38c',
//     ['5d3fa4c6800330d91ac66142699247457bbc3d74', '891c406f69190bb835b0fae68383c5772e593cb0']
//   ],
//   [
//     '891c406f69190bb835b0fae68383c5772e593cb0',
//     ['659d53056f6a09be3b0a912480dd2faa681b9099', '5d3fa4c6800330d91ac66142699247457bbc3d74']
//   ],
//   [
//     '5d3fa4c6800330d91ac66142699247457bbc3d74',
//     ['981d0c805baffe086307fd934fc2a71abfa7b6d7', 'a1fadd82de4251c3e529465869c4ea03a38aab61']
//   ],
//   [
//     'a1fadd82de4251c3e529465869c4ea03a38aab61',
//     ['2ec23c99d59519fbec24b99ef4a4995f29b8dc20', '1f9bac11b37293ffcb2dc81adc84d2cf829737e7']
//   ]
// ]

const commits = [['A', ['B']], ['C', ['D']], ['B', ['E']], ['F', ['E']], ['D', ['E']], ['E', ['H']]]

let branchIndex = 0
const reserve = []
const branches = {}

const getBranch = sha => {
  if (branches[sha] == null) {
    branches[sha] = branchIndex
    reserve.push(branchIndex)
    branchIndex += 1
  }

  return branches[sha]
}

const fillRoutes = (from, to, iterable) => iterable.map((branch, index) => [from(index), to(index), branch])

const nodes = commits.map(commit => {
  const [sha, parents] = commit
  const [parent, otherParent] = parents

  const branch = getBranch(sha)
  const offset = reserve.indexOf(branch)
  let routes = []

  if (parents.length === 1) {
    if (branches[parent] != null) {
      // create branch
      routes = [
        ...fillRoutes(i => i + offset + 1, i => i + offset + 1 - 1, reserve.slice(offset + 1)),
        ...fillRoutes(i => i, i => i, reserve.slice(0, offset))
      ]

      reserve.splice(reserve.indexOf(branch), 1)
      routes = [[offset, reserve.indexOf(branches[parent]), branch]]
    } else {
      // straight
      routes = [...fillRoutes(i => i, i => i, reserve)]
      branches[parent] = branch
    }
  } else if (parents.length === 2) {
    // merge branch
    branches[parent] = branch
    routes = [...fillRoutes(i => i, i => i, reserve), [offset, reserve.indexOf(otherBranch), getBranch(otherParent)]]
  }

  return { sha, offset, branch, routes }
})

console.log(JSON.stringify(nodes))
