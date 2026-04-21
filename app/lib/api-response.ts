import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export type ApiSuccess<T> = { success: true; data: T; message?: string }
export type ApiError = { success: false; error: string; fields?: Record<string, string[]> }
export type ApiResponse<T> = ApiSuccess<T> | ApiError

export function ok<T>(data: T, message?: string, status = 200) {
  const body: ApiSuccess<T> = { success: true, data }
  if (message) body.message = message
  return NextResponse.json(body, { status })
}

export function err(error: string, status = 400, fields?: Record<string, string[]>) {
  const body: ApiError = { success: false, error }
  if (fields) body.fields = fields
  return NextResponse.json(body, { status })
}

export function validationErr(zodError: ZodError) {
  const fields: Record<string, string[]> = {}
  for (const issue of zodError.issues) {
    const path = issue.path.join('.') || '_'
    fields[path] = [...(fields[path] ?? []), issue.message]
  }
  return NextResponse.json<ApiError>(
    { success: false, error: 'Valideringsfeil', fields },
    { status: 422 }
  )
}
