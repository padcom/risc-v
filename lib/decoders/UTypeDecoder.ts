import { Decoder } from "./Decoder"

export class UTypeDecoder extends Decoder {
  decode(arg0: number) {
    const { opcode } = super.decode(arg0)
    const rd  = (arg0 & 0b00000000000000000000_11111_0000000) >>> 7
    const imm = (arg0 & 0b11111111111111111111_00000_0000000) >>> 0

    return { imm, rd, opcode }
  }
}
