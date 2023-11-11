/* eslint-disable no-extra-parens */
import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class JALR implements Operation {
  static OPCODE = 0b1100111
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode } = this.decoder.decode(instruction)

    return opcode === JALR.OPCODE
  }

  execute(instruction: uint32, registers: Registers) {
    const { rd, rs1, imm } = this.decoder.decode(instruction)

    registers.pc = (imm + registers.read(rs1)) & (~1)
    registers.write(rd, registers.pc + 4)
  }
}
