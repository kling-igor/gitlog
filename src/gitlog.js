import React, { useRef, useEffect } from 'react'

const X_STEP = 10
const Y_STEP = 30

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512
const LINE_WIDTH = 2
const COMMIT_RADIUS = 5

const branchColor = branch => {
  return (
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
  )
}

const yPositionForIndex = yIndex => {
  return (yIndex + 0.5) * Y_STEP
}

const xPositionForIndex = xIndex => {
  // Subtract the position from the width to right-align our elements
  // return CANVAS_WIDTH - (xIndex + 1) * X_STEP

  return (xIndex + 1) * X_STEP
}

const drawCommit = (ctx, commit, yIndex) => {
  // Thicker lines for the circles, or they look odd
  ctx.lineWidth = LINE_WIDTH * 2

  var x = xPositionForIndex(commit.position), // Positioning of commit circle
    y = yPositionForIndex(yIndex),
    innerRadius = COMMIT_RADIUS - LINE_WIDTH

  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#000000'
  ctx.beginPath()
  ctx.arc(x, y, innerRadius, 0, 2 * Math.PI) // Draw a circle
  ctx.stroke() // Draw the outer line
  ctx.fill() // Fill the inner circle
}

const drawRoute = (ctx, route, yIndex) => {
  var fromX = xPositionForIndex(route.from), // Starting position for route
    fromY = yPositionForIndex(yIndex),
    toX = xPositionForIndex(route.to), // Ending position for route
    toY = yPositionForIndex(yIndex + 1) // НЕ ВЕРНО!!!

  ctx.strokeStyle = branchColor(route.branch) // Gets a colour based on the branch no.
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

const drawGraph = (ctx, graphNodes) => {
  graphNodes.forEach((node, yIndex) => {
    // Draw the routes for this node
    node.routes.forEach(route => drawRoute(ctx, route, yIndex))

    // Draw the commit on top of the routes
    drawCommit(ctx, node, yIndex)
  })
}

const graph = [
  {
    position: 0, // X-axis location for the commit in this row
    routes: [
      {
        from: 0, // X-axis of the starting location for the branch line
        to: 1, // X-axis for the finishing location for the branch line
        branch: 0 // Branch number (used for colouring the line)
      }
    ]
  },
  {
    position: 1, // X-axis location for the commit in this row
    routes: [
      {
        from: 1, // X-axis of the starting location for the branch line
        to: 1, // X-axis for the finishing location for the branch line
        branch: 0 // Branch number (used for colouring the line)
      }
    ]
  }
  // {
  //   position: 1, // X-axis location for the commit in this row
  //   routes: [
  //     {
  //       from: 1, // X-axis of the starting location for the branch line
  //       to: 1, // X-axis for the finishing location for the branch line
  //       branch: 0 // Branch number (used for colouring the line)
  //     }
  //   ]
  // },
  // {
  //   position: 0, // X-axis location for the commit in this row
  //   routes: [
  //     {
  //       from: 0, // X-axis of the starting location for the branch line
  //       to: 0, // X-axis for the finishing location for the branch line
  //       branch: 1 // Branch number (used for colouring the line)
  //     }
  //   ]
  // }
  // {
  //   position: 1, // X-axis location for the commit in this row
  //   routes: [
  //     {
  //       from: 1, // X-axis of the starting location for the branch line
  //       to: 1, // X-axis for the finishing location for the branch line
  //       branch: 0 // Branch number (used for colouring the line)
  //     }
  //   ]
  // }
]

export const GitLog = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // ctx.beginPath()
    // ctx.arc(95, 50, 40, 0, 2 * Math.PI)
    // ctx.stroke()
    drawGraph(ctx, graph)
  }, [])

  return <canvas ref={canvasRef} width={500} height={500} />
}
