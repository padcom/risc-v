/* eslint-disable no-extra-parens */
import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class JALR implements Operation {
  static OPCODE = 0b1100111
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode } = this.decoder.decode(instruction)

    return opcode === JALR.OPCODE
  }

  execute(instruction: uint32, registers: Registers) {
    const { rd, rs1, imm } = this.decoder.decode(instruction)

    // console.log('rd  ', rd)
    // console.log('rs1 ', rs1)
    // console.log('imm ', imm)
    // console.log('immu', immu.toBin32())
    // console.log(0b11111111110.u12s32())

    registers.pc = (imm + registers.x[rs1]) & (~1)
    registers.x[rd] = registers.pc + 4
  }
}
