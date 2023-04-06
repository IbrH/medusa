import { IsString } from "class-validator"
import { validator } from "@medusajs/utils"

export default async (req, res) => {
  const validated = await validator(CreateDraftInvoiceReq, req.body)

  try {
    const economicService = req.scope.resolve("economicService")
    await economicService.draftEconomicInvoice(validated.orderId)
    res.sendStatus(200)
  } catch (error) {
    throw error
  }
}

class CreateDraftInvoiceReq {
  @IsString
  orderId
}
