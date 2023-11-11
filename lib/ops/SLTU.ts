import { RTypeDecoder } from '../decoders/RTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class SLTU implements Operation {
  static OPCODE = 0b0110011
  static FUNCT3 = 0b011
  static FUNCT7 = 0b0000000
  decoder = new RTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3, funct7 } = this.decoder.decode(instruction)

    return opcode === SLTU.OPCODE && funct3 === SLTU.FUNCT3 && funct7 === SLTU.FUNCT7
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, rd } = this.decoder.decode(instruction)
    registers.x[rd] = registers.x[rs1].s32u32() < registers.x[rs2].s32u32() ? 1 : 0
  }
}
