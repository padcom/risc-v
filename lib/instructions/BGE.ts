import { BTypeDecoder } from '../decoders/BTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class BGE implements Operation {
  static OPCODE = 0b1100011
  static FUNCT3 = 0b101
  decoder = new BTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === BGE.OPCODE && funct3 === BGE.FUNCT3
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, imm } = this.decoder.decode(instruction)
    if (registers.read(rs1) > registers.read(rs2)) {
      registers.pc += imm
    }
  }
}
