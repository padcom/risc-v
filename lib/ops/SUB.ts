import { RTypeDecoder } from '../decoders/RTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class SUB implements Operation {
  static OPCODE = 0b0110011
  static FUNCT3 = 0b000
  static FUNCT7 = 0b0100000
  decoder = new RTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3, funct7 } = this.decoder.decode(instruction)

    return opcode === SUB.OPCODE && funct3 === SUB.FUNCT3 && funct7 === SUB.FUNCT7
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, rd } = this.decoder.decode(instruction)
    registers.x[rd] = registers.x[rs1] - registers.x[rs2] & 0xffffffff
  }
}
