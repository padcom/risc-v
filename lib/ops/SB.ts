import { STypeDecoder } from '../decoders/STypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class SB implements Operation {
  static OPCODE = 0b0100011
  static FUNCT3 = 0b000
  decoder = new STypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === SB.OPCODE && funct3 === SB.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rs1, rs2, imm } = this.decoder.decode(instruction)
    memory.write8(registers.x[rs1] + imm, registers.x[rs2] & 0xff)
  }
}
