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
/*
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
*/

const graph = [
  {
    sha: '5fcbfdb998b69bcec729f79f346d34e8f20c642f',
    offset: 0,
    branch: 0,
    routes: [[0, 0, 0]]
  },
  {
    sha: 'e8438a0217eff657ac47cec2816003c16182b653',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: '0f2eeef1329333084a158541d80e6fc538462a48',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: '7d8835ec29452540b646e192937de2bc1a49cbaf',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: '01724ba5aafc3c3a5df3d43d24d7c4d2fdcb7d9c',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: '53797fdfcaa1d06a32f9abd61360fb354ed51929',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: '41ad84fa675406e30854835b2ebde8aa61e226b6',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: 'efaf2871c5e3086482b93aa2c27547a0854e000e',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: 'd50f88b728a82bb6451e0f07f1c53842c8b9aec1',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: '76708c336be8e3b094d963ce68ff5680bdd82866',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: '3d32a13255de9b37c5b0b568619d1eeebf5ab06d',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  },
  {
    sha: 'f718b0207ca5212f728dd2b879d0a6515976e470',
    offset: 1,
    branch: 1,
    routes: [[0, 0, 0], [1, 1, 1]]
  }
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
