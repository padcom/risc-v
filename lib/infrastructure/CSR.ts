/* eslint-disable no-multi-spaces */
import { RAM } from './Memory'

export class CSR extends RAM {
  static BASE   = 0x00000000
  static LENGTH = 0x1000

  constructor() {
    super(CSR.BASE, CSR.LENGTH)
  }
}
