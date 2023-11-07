import { BTypeDecoder } from '../decoders/BTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class BEQ implements Operation {
  static OPCODE = 0b1100011
  static FUNCT3 = 0b000
  decoder = new BTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === BEQ.OPCODE && funct3 === BEQ.FUNCT3
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, imm } = this.decoder.decode(instruction)
    if (registers.x[rs1] === registers.x[rs2]) {
      registers.pc += imm
    }
  }
}
