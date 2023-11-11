import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class LHU implements Operation {
  static OPCODE = 0b0000011
  static FUNCT3 = 0b101
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === LHU.OPCODE && funct3 === LHU.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rd, rs1, imm } = this.decoder.decode(instruction)
    registers.write(rd, memory.read16(registers.read(rs1) + imm))
  }
}
