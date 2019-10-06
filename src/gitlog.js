import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import graph from './graph'

const ROW_HEIGHT = 25
const X_STEP = 15
const Y_STEP = ROW_HEIGHT

const LINE_WIDTH = 2
const COMMIT_RADIUS = 5

// TODO: высчитывать динамически в зависимости от максимального кол-ва || веток (процессинг только это покажет)
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

const NO_BRANCH_COLOR = '#a0a5a9'

const colors = [
  '#84b817',
  '#e32017',
  '#ee7c0e',
  '#ffd300',
  '#f3a9bb',
  '#b36305',
  '#00a4a7',
  '#00782a',
  '#003688',
  '#9b0056',
  '#95cdba'
]

const CanvasStyle = styled.canvas`
  z-index: 9999;
  position: absolute;
  left: 0px;
  top: 0px;
  pointer-events: none;
`

const fillRoutes = (from, to, iterable) => iterable.map((branch, index) => [from(index), to(index), branch])
const I = i => i

const branchColor = branch => colors[branch % 11] || 'black'

const yPositionForIndex = yIndex => (yIndex + 0.5) * Y_STEP

const xPositionForIndex = xIndex => (xIndex + 1) * X_STEP

const drawCommit = (ctx, topOffset, commit, yIndex) => {
  const { sha, offset, isHead, branch } = commit

  const x = xPositionForIndex(offset) // Positioning of commit circle
  const y = yPositionForIndex(yIndex) + topOffset
  const innerRadius = COMMIT_RADIUS - LINE_WIDTH - (!sha || isHead ? 1 : 0)

  // ctx.fillStyle = !sha || isHead ? '#ffffff' : branchColor(branch)
  // ctx.strokeStyle = sha ? branchColor(branch) : NO_BRANCH_COLOR
  // ctx.lineWidth = !sha || isHead ? 8 : LINE_WIDTH * 2 - 1 // + (!sha ? 2 : 0)

  ctx.fillStyle = branchColor(branch)
  ctx.strokeStyle = '#fff' // соответствует цвету фона!!!
  ctx.lineWidth = 2

  ctx.beginPath()
  // ctx.arc(x, y, innerRadius, 0, 2 * Math.PI) // Draw a circle
  ctx.arc(x, y, 4.5, 0, 2 * Math.PI) // Draw a circle
  ctx.closePath()
  ctx.stroke() // Draw the outer line
  ctx.fill() // Fill the inner circle

  // ctx.fillStyle = '#000'
  // ctx.strokeStyle = '#000'
  // ctx.font = '12px Arial'
  // ctx.fillText(sha, x + 8, y + 4)
}

const drawRoute = (ctx, topOffset, route, commit, yIndex) => {
  const { sha } = commit
  const [from, to, branch] = route

  // Starting position for route
  const fromX = xPositionForIndex(from)
  const fromY = yPositionForIndex(yIndex) + topOffset

  // Ending position for route
  const toX = xPositionForIndex(to)
  const toY = yPositionForIndex(yIndex + 1) + topOffset

  ctx.strokeStyle = sha ? branchColor(branch) : NO_BRANCH_COLOR // Gets a colour based on the branch no.
  // ctx.fillStyle = sha ? branchColor(branch) : NO_BRANCH_COLOR // Gets a colour based on the branch no.

  ctx.lineWidth = 2 //LINE_WIDTH

  ctx.beginPath()
  ctx.moveTo(fromX, fromY) // Place the cursor at the start point

  if (fromX === toX) {
    ctx.lineTo(toX, toY) // Draw a line to the finish point
  } else {
    ctx.bezierCurveTo(fromX - X_STEP / 4, fromY + Y_STEP / 1.5, toX + X_STEP / 4, toY - Y_STEP / 1.5, toX, toY)
  }

  // ctx.fill()
  ctx.stroke()
}

const drawGraph = (ctx, topOffset, nodes) => {
  nodes.forEach((node, yIndex) => {
    // Draw the routes for this node
    node.routes.forEach(route => drawRoute(ctx, topOffset, route, node, yIndex))

    // Draw the commit on top of the routes
    drawCommit(ctx, topOffset, node, yIndex)
  })
}

const processCommits = data => {
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

  return data.map(({ sha, parents }) => {
    const [parent, otherParent] = parents

    const branch = getBranch(sha)
    const offset = reserve.indexOf(branch)

    let routes = []

    if (parents.length === 1) {
      if (branches[parent] == null) {
        // прямой путь
        routes = [...fillRoutes(I, I, reserve)]
        // единственный предок будет в том же столбце - передаем трекинг
        branches[parent] = branch
      } else {
        routes = [
          // все возможные ветки правее текущей загибаем влево
          ...fillRoutes(i => i + offset + 1, i => i + offset + 1 - 1, reserve.slice(offset + 1)),
          // все возможные ветки левее текущей продолжают идти параллельно
          ...fillRoutes(I, I, reserve.slice(0, offset))
        ]

        // удаляем текущую ветку из списка
        reserve.splice(offset, 1)

        // загибаем текущую ветку в сторону ее родителя
        routes = [...routes, [offset, reserve.indexOf(branches[parent]), branch]]
      }
    } else if (parents.length === 2) {
      if (branches[parent] == null) {
        branches[parent] = branch

        routes = [...routes, ...fillRoutes(I, I, reserve)]
      } else {
        const parentOffset = reserve.indexOf(branches[parent])
        if (parentOffset !== offset) {
          // загибаем ветку в сторону родителя
          routes = [...routes, [offset, parentOffset, branch]]

          routes = [
            ...routes,
            // все возможные ветки правее текущей загибаем влево
            ...fillRoutes(i => i + offset + 1, i => i + offset + 1 - 1, reserve.slice(offset + 1)),
            // все возможные ветки левее текущей продолжают идти параллельно
            ...fillRoutes(I, I, reserve.slice(0, offset))
          ]

          reserve.splice(offset, 1)
        }
      }

      routes = [...routes, ...fillRoutes(I, I, reserve)]

      const otherBranch = getBranch(otherParent)
      routes = [...routes, [offset, reserve.indexOf(otherBranch), otherBranch]]
    }

    // удаляем ветку из кеша (на нее никто не ссылается больше)
    delete branches[sha]

    return {
      sha,
      offset,
      branch,
      routes
    }
  })
}

export const GitLog = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    drawGraph(ctx, 0, processCommits(graph))
  }, [])

  return <CanvasStyle ref={canvasRef} width={500} height={500} />
}
