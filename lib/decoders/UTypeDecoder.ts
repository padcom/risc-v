/* eslint-disable no-multi-spaces */
import { uint32 } from '../infrastructure/Memory'
import { Decoder } from './Decoder'

export class UTypeDecoder extends Decoder {
  decode(instruction: uint32) {
    const { opcode } = super.decode(instruction)
    const rd  = (instruction & 0b00000000000000000000_11111_0000000) >>> 7
    const imm = (instruction & 0b11111111111111111111_00000_0000000) >>> 0

    return { imm, rd, opcode }
  }
}
