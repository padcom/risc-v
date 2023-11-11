/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
import { it, expect } from 'vitest'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

export interface AluTestCase {
  instruction: uint32
  rs1        : uint5
  rs1I       : uint32
  rd         : uint5
  rdO        : uint32
}

export function test(op: any, { instruction, rs1, rs1I, rd, rdO }: AluTestCase) {
  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    registers.x[rs1] = rs1I
    expect(op.recognize(instruction)).toBe(true)
    op.execute(instruction, registers)
    expect(registers.x[rd]).toBe(rdO.u32s32())
  })
}
