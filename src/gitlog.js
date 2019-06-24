import React, { useRef, useEffect } from 'react'

const X_STEP = 15
const Y_STEP = 30

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512
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
