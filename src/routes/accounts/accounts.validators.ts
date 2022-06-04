import { param, body } from 'express-validator'

const Index = param('index').notEmpty().isNumeric()

const DateBody = body('date')
  .notEmpty()
  .isLength({ min: 10, max: 10 })
  .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
const DateParam = param('date')
  .notEmpty()
  .isLength({ min: 10, max: 10 })
  .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)

const BigCategoryBody = body('bigCategory').notEmpty()
const SmallCategoryBody = body('smallCategory').notEmpty()
const CardBody = body('card').notEmpty()
const CostBody = body('cost').isNumeric().notEmpty()

const Month = param('date')
  .notEmpty()
  .isLength({ min: 7, max: 7 })
  .matches(/^\d{4}-(0[1-9]|1[012])$/)

const Year = param('date')
  .notEmpty()
  .isLength({ min: 4, max: 4 })
  .matches(/^\d{4}$/)

const Card = param('card')
  .exists()
  .matches(/^(cash|shinhan|samsung|hyundai|woori|lotte|kb)$/)
  .notEmpty()
  .isString()

export {
  Index,
  DateBody,
  DateParam,
  BigCategoryBody,
  SmallCategoryBody,
  CardBody,
  CostBody,
  Month,
  Year,
  Card,
}
