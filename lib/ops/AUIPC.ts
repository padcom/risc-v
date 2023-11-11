/* eslint-disable max-len */
import { UTypeDecoder } from '../decoders/UTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class AUIPC implements Operation {
  static OPCODE = 0b0010111
  static decoder = new UTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode } = AUIPC.decoder.decode(instruction)

    return opcode === AUIPC.OPCODE
  }

  execute(instruction: uint32, registers: Registers) {
    const { rd, imm } = AUIPC.decoder.decode(instruction)
    registers.write(rd, imm + registers.pc)
  }
}
