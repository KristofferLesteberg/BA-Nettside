import type { EducationField } from '@/generated/prisma'

export const EDUCATION_FIELD_LABELS: Record<EducationField, string> = {
  PLUMBER:      'Rørlegger',
  CONCRETE:     'Betong',
  CARPENTER:    'Tømrer',
  CONSTRUCTION: 'Anlegg',
}

export const EDUCATION_FIELD_OPTIONS: { value: EducationField; label: string }[] =
  (Object.entries(EDUCATION_FIELD_LABELS) as [EducationField, string][]).map(
    ([value, label]) => ({ value, label })
  )

export const CATEGORY_TO_URL: Record<EducationField | 'ALL', string> = {
  ALL:          'alle',
  PLUMBER:      'rørlegger',
  CONCRETE:     'betong',
  CARPENTER:    'tømrer',
  CONSTRUCTION: 'anlegg',
}

export const CATEGORY_FROM_URL: Record<string, EducationField | 'ALL'> = {
  alle:      'ALL',
  rørlegger: 'PLUMBER',
  betong:    'CONCRETE',
  tømrer:    'CARPENTER',
  anlegg:    'CONSTRUCTION',
}
