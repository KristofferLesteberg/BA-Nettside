export const CONFIG_KEYS = {
  SESSION_LIFETIME_SECONDS: 'session_lifetime_seconds',
  ADMIN_USERNAME:           'admin_username',
  ADMIN_PASSWORD:           'admin_password',
  ADMIN_EMAIL_ALLOWLIST:    'admin_email_allowlist',
  EMAIL_MAX_RETRY_ATTEMPTS: 'email_max_retry_attempts',
  HIDE_TEST_DATA:           'hide_test_data',
  SESSION_INVALIDATED_AT:   'session_invalidated_at',
} as const

export type ConfigKey = (typeof CONFIG_KEYS)[keyof typeof CONFIG_KEYS]
