import { compare, genSalt, hash } from "bcryptjs";

// Salt é um valor aleatório que é adicionado ao password para gerar o hash
// Quanto maior o salt, mais seguro é o hash e mais tempo demora para verificar e gerar o hash
const SALT_RANDOMS = 8;

const hashPassword = async  (password: string) => {
  // Gera o salt
  const saltGenerated = await genSalt(SALT_RANDOMS);
  const hashPass = await hash(password, saltGenerated);
  return hashPass;
}

const verifyPassword = async (password: string, hash: string) => {
  const isPasswordValid = await compare(password, hash);
  return isPasswordValid;
}

export const passwordCrypto = {
  hashPassword,
  verifyPassword
}
