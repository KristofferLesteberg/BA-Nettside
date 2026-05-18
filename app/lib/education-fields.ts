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
