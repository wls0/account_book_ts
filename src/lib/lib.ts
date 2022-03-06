export interface IErrorCode {
  code: number
  result: boolean
  msg: string
  data: any
}

const Send = (res: any, send: IErrorCode): void => {
  res.status(send.code).json(send)
}

export { Send }
