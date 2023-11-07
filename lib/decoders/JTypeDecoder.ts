import { Decoder, encode } from './Decoder'

export class JTypeDecoder extends Decoder {
  decode(arg0: number) {
    const { opcode } = super.decode(arg0)
    const rd = (arg0 & 0b111110000000) >>> 7
    const imm0 = (arg0 & 0b1_0000000000_0_00000000_00000_0000000) >>> 11
    const imm1 = (arg0 & 0b0_0000000000_0_11111111_00000_0000000) >>> 0
    const imm2 = (arg0 & 0b0_0000000000_1_00000000_00000_0000000) >>> 9
    const imm3 = (arg0 & 0b0_1111111111_0_00000000_00000_0000000) >>> 20
    const imm = imm0 | imm1 | imm2 | imm3

    return { imm, rd, opcode }
  }
}
