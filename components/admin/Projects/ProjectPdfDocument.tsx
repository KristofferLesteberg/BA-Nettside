import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import { type SerializedProject } from './ProjectCard'

const RED         = '#c0392b'
const BLUE        = '#1a5276'
const DARK        = '#111827'
const MUTED       = '#6b7280'
const SURFACE     = '#f3f4f6'
const BORDER      = '#e5e7eb'

const STATUS_LABELS: Record<string, string> = {
  NEW:         'Nytt prosjekt',
  IN_PROGRESS: 'Pågående',
  COMPLETE:    'Ferdig',
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  NEW:         { bg: '#e0e7ff', color: '#4338ca' },
  IN_PROGRESS: { bg: '#ffedd5', color: '#c2410c' },
  COMPLETE:    { bg: '#d4edda', color: '#1e7e34' },
}

const EDUCATION_LABELS: Record<string, string> = {
  BUILDING:     'Bygg',
  CONSTRUCTION: 'Anlegg',
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: DARK,
    backgroundColor: '#ffffff',
    paddingBottom: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: RED,
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  logo: {
    height: 32,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
  },
  body: {
    paddingHorizontal: 32,
    paddingTop: 22,
  },
  projectTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 10,
  },
  pillRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  pill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  pillEducation: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: SURFACE,
    color: '#374151',
  },
  submittedDate: {
    fontSize: 9,
    color: MUTED,
    marginBottom: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: BLUE,
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  descBox: {
    backgroundColor: SURFACE,
    borderRadius: 4,
    padding: 12,
  },
  descText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: DARK,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: 9,
    color: MUTED,
    width: 130,
    flexShrink: 0,
  },
  fieldValue: {
    fontSize: 10,
    color: DARK,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: RED,
  },
  footerId: {
    fontSize: 8,
    color: MUTED,
    fontFamily: 'Courier',
  },
  footerPage: {
    fontSize: 8,
    color: MUTED,
  },
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nb-NO', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  )
}

export default function ProjectPdfDocument({
  project,
  logoSrc,
}: {
  project: SerializedProject
  logoSrc: string
}) {
  const statusColor = STATUS_COLORS[project.status]
  const priceRange  = `${project.minPrice.toLocaleString('nb-NO')} – ${project.maxPrice.toLocaleString('nb-NO')} kr`

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Image src={logoSrc} style={styles.logo} />
          <Text style={styles.headerTitle}>Prosjektforespørsel</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>

          {/* Title block */}
          <Text style={styles.projectTitle}>{project.title}</Text>
          <View style={styles.pillRow}>
            <Text style={[styles.pill, { backgroundColor: statusColor.bg, color: statusColor.color }]}>
              {STATUS_LABELS[project.status]}
            </Text>
            {project.educationField && (
              <Text style={styles.pillEducation}>
                {EDUCATION_LABELS[project.educationField]}
              </Text>
            )}
          </View>
          <Text style={styles.submittedDate}>Innsendt {formatDate(project.createdAt)}</Text>

          {/* Beskrivelse */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>BESKRIVELSE</Text>
            <View style={styles.descBox}>
              <Text style={styles.descText}>{project.description}</Text>
            </View>
          </View>

          {/* Prisforventning */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>BETALING</Text>
            <Field label="Prisforventning"  value={priceRange} />
            <Field label="Fakturaadresse"   value={project.billingAddress} />
          </View>

          {/* Kontaktinformasjon */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>KONTAKTINFORMASJON</Text>
            <Field label="Navn"                value={`${project.clientForename} ${project.clientSurname}`} />
            <Field label="E-post"              value={project.clientEmail} />
            <Field label="Telefon"             value={project.clientPhone} />
            <Field label="Bestillingsadresse"  value={project.address} />
          </View>

          {/* Organisasjon — only rendered when at least one field is present */}
          {(project.organizationName || project.organizationNumber) && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>ORGANISASJON</Text>
              <Field label="Navn"    value={project.organizationName} />
              <Field label="Org.nr." value={project.organizationNumber} />
            </View>
          )}

        </View>

        {/* Footer — fixed so it appears on every page */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerId}>ID: {project.id}</Text>
          <Text
            style={styles.footerPage}
            render={({ pageNumber, totalPages }) => `Side ${pageNumber} av ${totalPages}`}
          />
        </View>

      </Page>
    </Document>
  )
}
