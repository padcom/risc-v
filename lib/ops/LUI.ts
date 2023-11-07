import { UTypeDecoder } from '../decoders/UTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Operation } from './Operation'

export class LUI implements Operation {
  static OPCODE = 0b0110111
  static decoder = new UTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode } = LUI.decoder.decode(instruction)

    return opcode === LUI.OPCODE
  }

  execute(instruction: uint32, registers: Registers) {
    const { rd, imm } = LUI.decoder.decode(instruction)
    registers.x[rd] = imm
  }
}
