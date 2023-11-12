import { BTypeDecoder } from '../decoders/BTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class BLTU implements Operation {
  static OPCODE = 0b1100011
  static FUNCT3 = 0b110
  decoder = new BTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === BLTU.OPCODE && funct3 === BLTU.FUNCT3
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, imm } = this.decoder.decode(instruction)
    if (registers.read(rs1).s32u32() < registers.read(rs2).s32u32()) {
      registers.pc += imm
    }
  }
}
