import nodegit from 'nodegit'
import { resolve } from 'path'

// https://github.com/nodegit/nodegit/blob/master/examples/general.js
;(async () => {
  const repo = await nodegit.Repository.open(resolve(__dirname, '..', '..', '..', 'client', '.git'))

  // const commit = await repo.getCommit(nodegit.Oid.fromString('e0d173f9d2ece40cc21319bb9e8ee1c934a997d4'))
  /*
  const referenceNames = await repo.getReferenceNames(nodegit.Reference.TYPE.LISTALL)

  for (const name of referenceNames) {
    const reference = await repo.getReference(name)
    if (reference.isConcrete()) {
      console.log('Reference (concrete):', name, reference.target().toString())
    } else if (reference.isSymbolic()) {
      console.log('Reference (symbolic):', name, reference.symbolicTarget().toString())
    }
  }
*/

  console.log('********************************************************\n')

  const commit = await repo.getHeadCommit()

  const revWalk = repo.createRevWalk()
  revWalk.sorting(nodegit.Revwalk.SORT.TOPOLOGICAL)
  revWalk.push(commit.sha())

  let limit = 20

  const walk = async () => {
    let oid
    try {
      oid = await revWalk.next()
      if (oid) {
        const commit = await repo.getCommit(oid)
        console.log(`['${commit.toString()}',`, commit.parents().map(parent => parent.toString()), '],')

        if (limit > 0) {
          limit -= 1
          await walk()
        }
      }
    } catch (e) {
      // console.log(e)
    }
  }

  await walk()
})()
