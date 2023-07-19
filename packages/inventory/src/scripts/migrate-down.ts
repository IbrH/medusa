import * as InventoryModels from "../models"

import { InternalModuleDeclaration, LoaderOptions } from "@medusajs/modules-sdk"

import { EntitySchema } from "@mikro-orm/core"
import { Logger } from "@medusajs/types"
import { ModulesSdkUtils } from "@medusajs/utils"
import { createConnection } from "../utils/create-connection"

export async function revertMigration(
  { options, logger }: Pick<LoaderOptions, "options" | "logger">,
  moduleDeclaration?: InternalModuleDeclaration
) {
  logger ??= console as unknown as Logger

  const dbData = ModulesSdkUtils.loadDatabaseConfig("product", options)

  const entities = Object.values(InventoryModels) as unknown as EntitySchema[]

  const orm = await createConnection(dbData, entities)

  try {
    const migrator = orm.getMigrator()
    await migrator.down()

    logger?.info("Inventory module migration reverted")
  } catch (error) {
    logger?.error(
      `Inventory module migration failed to revert - Error: ${error}`
    )
  }

  await orm.close()
}
