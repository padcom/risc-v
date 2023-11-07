/* eslint-disable no-multi-spaces */
import { uint32 } from '../infrastructure/Memory'
import { Decoder } from './Decoder'

export class JTypeDecoder extends Decoder {
  decode(instruction: uint32) {
    const { opcode } = super.decode(instruction)
    const rd   = (instruction & 0b0_0000000000_0_00000000_11111_0000000) >>> 7
    const imm0 = (instruction & 0b1_0000000000_0_00000000_00000_0000000) >>> 11
    const imm1 = (instruction & 0b0_0000000000_0_11111111_00000_0000000) >>> 0
    const imm2 = (instruction & 0b0_0000000000_1_00000000_00000_0000000) >>> 9
    const imm3 = (instruction & 0b0_1111111111_0_00000000_00000_0000000) >>> 20
    const imm = imm0 | imm1 | imm2 | imm3

    return { imm, rd, opcode }
  }
}
