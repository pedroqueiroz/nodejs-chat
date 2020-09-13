import { ShareQuotation } from '../types'

export const buildChatMessage = (shareQuotation: ShareQuotation) =>
  `${shareQuotation.title} quote is $${shareQuotation.quote} per share.`
