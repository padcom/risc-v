/* eslint-disable no-multi-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { it, expect } from 'vitest'
import { uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'
import { Registers } from '../infrastructure/Registers'

export interface BranchTestCase {
  instruction: uint32
  rs1        : uint5
  rs1I       : uint32
  rs2        : uint5
  rs2I       : uint32
  pcI        : uint32
  pcO        : uint32
}

export function test(
  op: any,
  { instruction, rs1, rs1I, rs2, rs2I, pcI, pcO }: BranchTestCase,
) {
  recognize(op, instruction)

  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    registers.write(rs1, rs1I)
    registers.write(rs2, rs2I)
    registers.pc = pcI

    op.execute(instruction, registers)

    expect(registers.pc).toBe(pcO)
  })
}
