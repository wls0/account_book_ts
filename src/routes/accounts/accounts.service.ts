import httpError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { Send } from '../../lib/lib'
import {
  WriteAccount,
  SelectAccount,
  ChangeAccount,
  RemoveAccount,
  CashCost,
  ShinhanCost,
  SamsungCost,
  HyundaiCost,
  WooriCost,
  LotteCost,
  KbCost,
  RevenueCost,
  UseCardList,
} from './accounts.repository'

// 가계부 생성
const CreateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userIndex = Number(req.user)
    const { date } = req.params
    const { bigCategory, smallCategory, card, cost } = req.body
    const result = await WriteAccount({
      userIndex,
      date,
      bigCategory,
      smallCategory,
      card,
      cost,
    })
    if (result) {
      Send(res, '')
    } else {
      throw httpError(500)
    }
  } catch (E) {
    next(E)
  }
}

// 가계부 수정
const UpdateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userIndex = Number(req.user)
    const index = Number(req.params.index)
    const { bigCategory, smallCategory, card, cost, date } = req.body
    const check = await SelectAccount({ userIndex, index })
    if (check) {
      const result = await ChangeAccount({
        index,
        userIndex,
        date,
        bigCategory,
        smallCategory,
        card,
        cost,
      })
      if (result) {
        Send(res, '')
      } else {
        throw httpError(500)
      }
    } else {
      throw httpError(404)
    }
  } catch (E) {
    next(E)
  }
}

// 가계부 삭제
const DeleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userIndex = Number(req.user)
    const index = Number(req.params.index)
    const check = await SelectAccount({ userIndex, index })
    if (check) {
      const result = await RemoveAccount({
        index,
      })
      if (result) {
        Send(res, '')
      } else {
        throw httpError(500)
      }
    } else {
      throw httpError(404)
    }
  } catch (E) {
    next(E)
  }
}

// 가계부 금액확인
const DayAccountFind = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userIndex = Number(req.user)
    const { date } = req.params

    const cash = await CashCost({ userIndex, date })
    const shinhan = await ShinhanCost({ userIndex, date })
    const samsung = await SamsungCost({ userIndex, date })
    const hyundai = await HyundaiCost({ userIndex, date })
    const woori = await WooriCost({ userIndex, date })
    const lotte = await LotteCost({ userIndex, date })
    const kb = await KbCost({ userIndex, date })
    const revenue = await RevenueCost({ userIndex, date })
    const total =
      cash + shinhan + samsung + hyundai + woori + lotte + kb - revenue
    const data = {
      cash,
      shinhan,
      samsung,
      hyundai,
      woori,
      lotte,
      kb,
      revenue,
      total,
    }

    Send(res, data)
  } catch (E) {
    next(E)
  }
}

const CardAccountFind = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userIndex = Number(req.user)
    const { card, date } = req.params
    let total
    const useList = await UseCardList({ userIndex, card, date })
    if (card === 'cash') {
      total = await CashCost({ userIndex, date })
    } else if (card === 'shinhan') {
      total = await ShinhanCost({ userIndex, date })
    } else if (card === 'samsung') {
      total = await SamsungCost({ userIndex, date })
    } else if (card === 'hyundai') {
      total = await HyundaiCost({ userIndex, date })
    } else if (card === 'woori') {
      total = await WooriCost({ userIndex, date })
    } else if (card === 'lotte') {
      total = await LotteCost({ userIndex, date })
    } else if (card === 'kb') {
      total = await KbCost({ userIndex, date })
    }
    Send(res, { useList, total })
  } catch (E: any) {
    next(E)
  }
}

export {
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
  DayAccountFind,
  CardAccountFind,
}
