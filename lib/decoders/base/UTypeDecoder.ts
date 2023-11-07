import { Decoder } from "../Decoder"

export class UTypeDecoder extends Decoder {
  decode(arg0: number) {
    const { opcode } = super.decode(arg0)
    const rd = (arg0 & 0b111110000000) >>> 7
    const imm = (arg0 & 0b11111111111111111111000000000000) >>> 0

    return { imm, rd, opcode }
  }
}
