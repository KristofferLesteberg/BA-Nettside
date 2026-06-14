'use server'

import { Prisma } from '@/generated/prisma'
import { prisma } from '@/app/lib/prisma'
import { CONFIG_KEYS, type ConfigKey } from '@/app/lib/app-config-keys'

const ENV_FALLBACKS: Partial<Record<ConfigKey, () => string | undefined>> = {
  [CONFIG_KEYS.ADMIN_USERNAME]:        () => process.env.ADMIN_USERNAME,
  [CONFIG_KEYS.ADMIN_PASSWORD]:        () => process.env.ADMIN_PASSWORD,
  [CONFIG_KEYS.ADMIN_EMAIL_ALLOWLIST]: () => process.env.ADMIN_EMAILS,
}

const HARDCODED_FALLBACKS: Partial<Record<ConfigKey, string>> = {
  [CONFIG_KEYS.SESSION_LIFETIME_SECONDS]: '3600',
  [CONFIG_KEYS.EMAIL_MAX_RETRY_ATTEMPTS]: '5',
  [CONFIG_KEYS.HIDE_TEST_DATA]:           'false',
}

export async function getAppConfig(key: ConfigKey): Promise<string | undefined> {
  try {
    const row = await prisma.appConfig.findUnique({ where: { key } })
    if (row) return row.value
  } catch (e) {
    // Table doesn't exist yet (pending migration) — fall through to defaults
    if (!(e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2021')) throw e
  }

  const envFallback = ENV_FALLBACKS[key]?.()
  if (envFallback !== undefined) return envFallback

  return HARDCODED_FALLBACKS[key]
}

export async function setAppConfig(key: ConfigKey, value: string): Promise<void> {
  await prisma.appConfig.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  })
}

export async function getAllAppConfig(): Promise<Record<ConfigKey, string | undefined>> {
  let rows: { key: string; value: string }[] = []
  try {
    rows = await prisma.appConfig.findMany()
  } catch (e) {
    if (!(e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2021')) throw e
  }
  const dbMap = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  const result = {} as Record<ConfigKey, string | undefined>
  for (const key of Object.values(CONFIG_KEYS) as ConfigKey[]) {
    result[key] = dbMap[key] ?? ENV_FALLBACKS[key]?.() ?? HARDCODED_FALLBACKS[key]
  }
  return result
}

export async function bumpSessionInvalidation(): Promise<void> {
  await setAppConfig(CONFIG_KEYS.SESSION_INVALIDATED_AT, new Date().toISOString())
}
