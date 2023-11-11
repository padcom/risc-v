import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class CSRRW implements Operation {
  static OPCODE = 0b1110011
  static FUNCT3 = 0b001
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === CSRRW.OPCODE && funct3 === CSRRW.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rs1, rd, imm: csr } = this.decoder.decode(instruction)

    if (rd !== 0) {
      const value = memory.read8(csr).u8u32()
      memory.write8(csr, registers.read(rs1))
      registers.write(rd, value)
    }
  }
}
