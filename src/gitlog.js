import React, { useRef, useEffect } from 'react'

const X_STEP = 15
const Y_STEP = 30

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 1024
const LINE_WIDTH = 2
const COMMIT_RADIUS = 5

const branchColor = branch =>
  [
    '#0098d4',
    '#b36305',
    '#e32017',
    '#ffd300',
    '#00782a',
    '#f3a9bb',
    '#a0a5a9',
    '#9b0056',
    '#003688',
    '#000000',
    '#95cdba',
    '#00a4a7',
    '#ee7c0e',
    '#84b817'
  ][branch] || 'black'

const yPositionForIndex = yIndex => (yIndex + 0.5) * Y_STEP

const xPositionForIndex = xIndex => (xIndex + 1) * X_STEP

const drawCommit = (ctx, commit, yIndex) => {
  const { offset } = commit

  // Thicker lines for the circles, or they look odd
  ctx.lineWidth = LINE_WIDTH * 2

  const x = xPositionForIndex(offset) // Positioning of commit circle
  const y = yPositionForIndex(yIndex)
  const innerRadius = COMMIT_RADIUS - LINE_WIDTH

  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#000000'
  ctx.beginPath()
  ctx.arc(x, y, innerRadius, 0, 2 * Math.PI) // Draw a circle
  ctx.stroke() // Draw the outer line
  ctx.fill() // Fill the inner circle
}

const drawRoute = (ctx, route, yIndex) => {
  const [from, to, branch] = route

  // Starting position for route
  const fromX = xPositionForIndex(from)
  const fromY = yPositionForIndex(yIndex)

  // Ending position for route
  const toX = xPositionForIndex(to)
  const toY = yPositionForIndex(yIndex + 1)

  ctx.strokeStyle = branchColor(branch) // Gets a colour based on the branch no.
  ctx.lineWidth = LINE_WIDTH

  ctx.beginPath()
  ctx.moveTo(fromX, fromY) // Place the cursor at the start point

  if (fromX === toX) {
    ctx.lineTo(toX, toY) // Draw a line to the finish point
  } else {
    ctx.bezierCurveTo(fromX - X_STEP / 4, fromY + Y_STEP / 2, toX + X_STEP / 4, toY - Y_STEP / 2, toX, toY)
  }

  ctx.stroke()
}

const drawGraph = (ctx, nodes) => {
  nodes.forEach((node, yIndex) => {
    // Draw the routes for this node
    node.routes.forEach(route => drawRoute(ctx, route, yIndex))

    // Draw the commit on top of the routes
    drawCommit(ctx, node, yIndex)
  })
}
/*
const graph = [
  {
    sha: 'A',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0]]
  },
  {
    sha: 'C',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: 'B',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: 'F',
    offset: 2,
    branch: 2,
    routes: [[0, 0, 0], [1, 1, 1], [2, 0, 2]]
  },
  {
    sha: 'D',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 0, 1]]
  },
  {
    sha: 'E',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0]]
  }
]
*/

const graph = [
  {
    sha: 'e0d173f9d2ece40cc21319bb9e8ee1c934a997d4',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [0, 1, 1]]
  },
  {
    sha: '0b277977ed6ea0a4a4adcf57bcfd420ed75a679c',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1], [1, 0, 0]]
  },
  {
    sha: 'c4c0cbffb08e0ff69bf3289a12774a5c49e32f28',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 1], [0, 2, 2]]
  },
  {
    sha: 'f3c22d7490f391d2cfebf7096ba6f56c01695425',
    offset: 2,
    branch: 2,
    routes: [[0, 0, 0], [1, 1, 1], [2, 2, 2]]
  },
  {
    sha: '8a87915da94c7eb8f348291d7c7e102fa6d041f4',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 1], [2, 2, 2], [0, 3, 3]]
  },
  {
    sha: '7155f00eb096820f209bca7ddfd310df101561ae',
    offset: 3,
    branch: 3,
    routes: [[0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 0, 3]]
  },
  {
    sha: '5a3b3fd85225695d801eae1f2508cb5bf6caa56a',
    offset: 1,
    branch: 1,
    routes: [[2, 1, 2], [0, 0, 0], [1, 0, 1]]
  },
  {
    sha: 'e8e3240365210045b99e1616fce021e954c54c6c',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 2], [0, 2, 4]]
  },
  {
    sha: 'af94fec43f3b4f242c30863e22618e04a12aa909',
    offset: 2,
    branch: 4,
    routes: [[0, 0, 0], [1, 1, 2], [2, 2, 4]]
  },
  {
    sha: 'e2fc5947d12f2e52c7f975de6de25d3c753822c8',
    offset: 2,
    branch: 4,
    routes: [[0, 0, 0], [1, 1, 2], [2, 0, 4]]
  },
  {
    sha: '30d6af421b202f5162951f52424733140ccd02b9',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 2], [0, 2, 5]]
  },
  {
    sha: '2f5b2df082fc5bdd6acd72e57a833d508d51eb55',
    offset: 2,
    branch: 5,
    routes: [[0, 0, 0], [1, 1, 2], [2, 0, 5]]
  },
  {
    sha: '08306420435b990de013f051a28efec2810cf0eb',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 2], [0, 2, 6]]
  },
  {
    sha: '60a72365cfedc932c66527df34c6bdd8a2e8057a',
    offset: 2,
    branch: 6,
    routes: [[0, 0, 0], [1, 1, 2], [2, 2, 6]]
  },
  {
    sha: '371e598b83a6cee023d9cb5597f25732cc2d3986',
    offset: 2,
    branch: 6,
    routes: [[0, 0, 0], [1, 1, 2], [2, 0, 6]]
  },
  {
    sha: 'c798b2fedb2e6aad7c92f9edfe85b1dda2954c94',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 2], [0, 2, 7]]
  },
  {
    sha: '964975c951ce0e9a8b1be72b90bf298b6bf9694e',
    offset: 2,
    branch: 7,
    routes: [[0, 0, 0], [1, 1, 2], [2, 2, 7], [2, 3, 8]]
  },
  {
    sha: 'fb9d6bbb5e07426913176523b216e0431095b38c',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 2], [2, 2, 7], [3, 3, 8], [0, 3, 8]]
  },
  {
    sha: '891c406f69190bb835b0fae68383c5772e593cb0',
    offset: 3,
    branch: 8,
    routes: [[0, 0, 0], [1, 1, 2], [2, 2, 7], [3, 3, 8], [3, 0, 0]]
  },
  {
    sha: '5d3fa4c6800330d91ac66142699247457bbc3d74',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0], [1, 1, 2], [2, 2, 7], [3, 3, 8], [0, 4, 9]]
  },
  {
    sha: 'a1fadd82de4251c3e529465869c4ea03a38aab61',
    offset: 4,
    branch: 9,
    routes: [[0, 0, 0], [1, 1, 2], [2, 2, 7], [3, 3, 8], [4, 4, 9], [4, 5, 10]]
  }
]

export const GitLog = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    drawGraph(ctx, graph)
  }, [])

  return <canvas ref={canvasRef} width={500} height={500} />
}
