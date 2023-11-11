import { STypeDecoder } from '../decoders/STypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class SH implements Operation {
  static OPCODE = 0b0100011
  static FUNCT3 = 0b001
  decoder = new STypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === SH.OPCODE && funct3 === SH.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rs1, rs2, imm } = this.decoder.decode(instruction)
    memory.write16(registers.read(rs1) + imm, registers.read(rs2) & 0xffff)
  }
}
