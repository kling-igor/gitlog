import React, { PureComponent } from 'react'

import styled from 'styled-components'

import { GlobalStyle } from './style'

import { GitLog } from './gitlog'
export default class App extends PureComponent {
  render() {
    return (
      <>
        <GlobalStyle />
        <GitLog />
      </>
    )
  }
}
