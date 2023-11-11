import { UTypeDecoder } from '../decoders/UTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class LUI implements Operation {
  static OPCODE = 0b0110111
  decoder = new UTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode } = this.decoder.decode(instruction)

    return opcode === LUI.OPCODE
  }

  execute(instruction: uint32, registers: Registers) {
    const { rd, imm } = this.decoder.decode(instruction)
    registers.write(rd, imm)
  }
}
