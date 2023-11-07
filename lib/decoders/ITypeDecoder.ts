/* eslint-disable no-multi-spaces */
import { Decoder } from './Decoder'
import { uint32 } from '../infrastructure/Memory'

export class ITypeDecoder extends Decoder {
  decode(instruction: uint32) {
    const { opcode } = super.decode(instruction)
    const rd     = (instruction & 0b000000000000_00000_000_11111_0000000) >>> 7
    const funct3 = (instruction & 0b000000000000_00000_111_00000_0000000) >>> 12
    const rs1    = (instruction & 0b000000000000_11111_000_00000_0000000) >>> 15
    const immu   = (instruction & 0b111111111111_00000_000_00000_0000000) >> 20
    const imm    = immu.u12s32()

    return { immu, imm, rs1, funct3, rd, opcode }
  }
}
