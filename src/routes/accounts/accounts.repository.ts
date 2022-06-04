import Accounts from '../../models/accountlist'
import sequelize from 'sequelize'
const Op = sequelize.Op

interface IAccount {
  index?: number
  userIndex: number
  date: string
  bigCategory: string
  smallCategory: string
  cost: number
  card: string
}

interface IAccountSum {
  userIndex: number
  date: string
}

interface IAccountSelectList extends IAccountSum {
  card: string
}

// date 형식은 YYYY-MM-DD
// 가계부 작성
export const WriteAccount = async (data: IAccount) => {
  try {
    const { userIndex, date, bigCategory, smallCategory, card, cost } = data
    await Accounts.create({
      userIndex,
      date,
      bigCategory,
      smallCategory,
      card,
      cost,
    })
    return true
  } catch (E) {
    return false
  }
}

// 특정 가계부 확인
export const SelectAccount = async (data: {
  index: number
  userIndex: number
}) => {
  const { index, userIndex } = data
  const account = await Accounts.findOne({
    where: {
      index,
      userIndex,
    },
  })
  if (account) {
    return true
  } else {
    return false
  }
}

// 가계부 수정
export const ChangeAccount = async (data: IAccount) => {
  try {
    const { index, userIndex, date, bigCategory, smallCategory, card, cost } =
      data
    await Accounts.update(
      {
        bigCategory,
        smallCategory,
        card,
        cost,
        date,
      },
      {
        where: { userIndex, index },
      },
    )
    return true
  } catch (E) {
    return false
  }
}

// 가계부 삭제
export const RemoveAccount = async (data: { index: number }) => {
  try {
    const { index } = data
    await Accounts.destroy({
      where: { index },
    })
    return true
  } catch (E) {
    return false
  }
}

// 현금 사용 금액
export const CashCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'cash',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 신한 카드 사용 금액
export const ShinhanCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'shinhan',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 삼성 카드 사용금액
export const SamsungCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'samsung',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 현대 카드 사용금액
export const HyundaiCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'hyundai',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 우리 카드 사용금액
export const WooriCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'woori',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 롯데 카드 사용금액
export const LotteCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'lotte',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// kb 카드 사용금액
export const KbCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'kb',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 수익 금액
export const RevenueCost = async (data: IAccountSum) => {
  const { userIndex, date } = data
  const cash = await Accounts.sum('cost', {
    where: {
      userIndex,
      card: 'revenue',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  let result = 0
  if (isNaN(cash) === false) {
    result = cash
  }
  return result
}

// 날짜 별 사용 카드별 상세 목록 확인
export const UseCardList = async (data: IAccountSelectList) => {
  const { userIndex, card, date } = data
  const total = await Accounts.findAll({
    where: {
      userIndex,
      card,
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%',
          },
        },
      ],
    },
  })
  return total
}
