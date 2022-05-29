import Users from '../../models/user'

export const IdFind = async (id: string) => {
  const user = await Users.findOne({ where: { id } })
  if (user) {
    return true
  } else {
    return false
  }
}

export const UserCreate = async (data: {
  id: string
  password: string
  salt: string
}) => {
  try {
    const { id, password, salt } = data
    await Users.create({
      id,
      password,
      salt,
    })
    return true
  } catch (E) {
    return false
  }
}
