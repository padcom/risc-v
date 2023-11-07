import { BTypeDecoder } from '../decoders/BTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class BGEU implements Operation {
  static OPCODE = 0b1100011
  static FUNCT3 = 0b111
  decoder = new BTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === BGEU.OPCODE && funct3 === BGEU.FUNCT3
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, imm } = this.decoder.decode(instruction)
    if (registers.x[rs1].s32u32() > registers.x[rs2].s32u32()) {
      registers.pc += imm
    }
  }
}
