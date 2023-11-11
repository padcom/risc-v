/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
import { it, expect } from 'vitest'
import { Registers } from '../infrastructure/Registers'
import { uint12, uint32, uint5, uint8 } from '../infrastructure/Memory'
import { recognize } from './common-test'
import { CSR } from '../infrastructure/CSR'

export interface CsrImmediateTestCase {
  instruction: uint32
  csr        : uint12,
  csrI       : uint8,
  csrO       : uint8,
  rd         : uint5,
  rdO        : uint32,
}

export function immediate(
  op: any,
  { instruction, csr, csrI, csrO, rd, rdO }: CsrImmediateTestCase,
  { debug = false } = {},
) {
  recognize(op, instruction)

  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    const csrs = new CSR()
    csrs.write8(csr, csrI)

    op.execute(instruction, registers, csrs)

    if (debug) {
      console.log('ins', instruction.toBin32())
      console.log('csr', csrs.read8(csr).toBin8())
      console.log('rd ', registers.x[rd].toBin32())
    }

    expect(registers.x[rd]).toBe(rdO.s32u32())
    expect(csrs.read8(csr)).toBe(csrO)
  })
}

export interface CsrRegisterTestCase {
  instruction: uint32
  csr        : uint12,
  csrI       : uint8,
  csrO       : uint8,
  rs1        : uint5,
  rs1I       : uint5,
  rd         : uint5,
}

export function register(
  op: any,
  { instruction, csr, csrI, csrO, rs1, rs1I, rd }: CsrRegisterTestCase,
  { debug = false } = {},
) {
  recognize(op, instruction)

  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    registers.x[rs1] = rs1I
    const csrs = new CSR()
    csrs.write8(csr, csrI)

    op.execute(instruction, registers, csrs)

    if (debug) {
      console.log('ins', instruction.toBin32())
      console.log('csr', csrs.read8(csr).toBin8())
      console.log('rs1', registers.x[rs1].toBin32())
      console.log('rd ', registers.x[rd].toBin32())
    }

    expect(registers.x[rd]).toBe(csrI.s32u32())
    expect(csrs.read8(csr)).toBe(csrO.s32u32())
  })
}
