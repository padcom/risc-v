import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class CSRRS implements Operation {
  static OPCODE = 0b1110011
  static FUNCT3 = 0b010
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === CSRRS.OPCODE && funct3 === CSRRS.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rs1, rd, imm: csr } = this.decoder.decode(instruction)

    const value = memory.read8(csr).u8u32()
    registers.x[rd] = value

    if (rs1 !== Registers.zero) {
      memory.write8(csr, value | registers.x[rs1])
    }
  }
}
