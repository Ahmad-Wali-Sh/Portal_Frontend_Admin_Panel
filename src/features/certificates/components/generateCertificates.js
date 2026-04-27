// ─────────────────────────────────────────────────────────────────────────────
// generateCertificates.js — PDF + ZIP generation for student certificates
// ─────────────────────────────────────────────────────────────────────────────

import { jsPDF } from 'jspdf'
import JSZip from 'jszip'

const COLORS = {
  primary:    [59, 130, 246],
  foreground: [17, 24, 39],
  muted:      [107, 114, 128],
  border:     [229, 231, 235],
  background: [255, 255, 255],
  secondary:  [16, 185, 129],
  muted_bg:   [243, 244, 246],
}

const PAGE_W = 297
const PAGE_H = 210
const MARGIN  = 16

function setColor(doc, c) { doc.setTextColor(c[0], c[1], c[2]) }
function setFill(doc, c)  { doc.setFillColor(c[0], c[1], c[2]) }
function setDraw(doc, c)  { doc.setDrawColor(c[0], c[1], c[2]) }

function fmtDate(str) {
  if (!str) return '—'
  const d = new Date(str)
  if (isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}

function genRefId(classId, studentId) {
  const yr = new Date().getFullYear()
  return `CERT-${yr}-${String(classId * 1000 + studentId).padStart(5, '0')}`
}

// ── Draw one certificate ──────────────────────────────────────────────────────

function drawCertificate(doc, { student, orgInfo, classInfo, subjectNames, overallScore, refId }) {
  const cx = PAGE_W / 2

  // Border frame
  setDraw(doc, COLORS.primary)
  doc.setLineWidth(2.5)
  doc.rect(MARGIN, MARGIN, PAGE_W - MARGIN * 2, PAGE_H - MARGIN * 2)
  doc.setLineWidth(0.5)
  doc.rect(MARGIN + 4, MARGIN + 4, PAGE_W - MARGIN * 2 - 8, PAGE_H - MARGIN * 2 - 8)

  // Corner squares
  const cs = 12
  setFill(doc, COLORS.primary)
  doc.rect(MARGIN, MARGIN, cs, cs, 'F')
  doc.rect(PAGE_W - MARGIN - cs, MARGIN, cs, cs, 'F')
  doc.rect(MARGIN, PAGE_H - MARGIN - cs, cs, cs, 'F')
  doc.rect(PAGE_W - MARGIN - cs, PAGE_H - MARGIN - cs, cs, cs, 'F')

  // Top & bottom accent bars
  setFill(doc, COLORS.primary)
  doc.rect(MARGIN + cs + 2, MARGIN, PAGE_W - MARGIN * 2 - cs * 2 - 4, 3, 'F')
  doc.rect(MARGIN + cs + 2, PAGE_H - MARGIN - 3, PAGE_W - MARGIN * 2 - cs * 2 - 4, 3, 'F')

  // Organization name
  let y = MARGIN + 22
  setColor(doc, COLORS.muted)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text((orgInfo.name || 'Educational Institution').toUpperCase(), cx, y, { align: 'center' })

  // Title
  y += 12
  setColor(doc, COLORS.foreground)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.text('CERTIFICATE', cx, y, { align: 'center' })
  y += 9
  setColor(doc, COLORS.muted)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text('OF COMPLETION', cx, y, { align: 'center' })

  // Accent bar
  y += 5
  setFill(doc, COLORS.primary)
  doc.rect(cx - 20, y, 40, 2, 'F')

  // "This certifies that"
  y += 12
  setColor(doc, COLORS.muted)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('This is to certify that', cx, y, { align: 'center' })

  // Student name
  y += 11
  setColor(doc, COLORS.foreground)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  const fullName = `${student.name} ${student.lastname}`
  doc.text(fullName, cx, y, { align: 'center' })

  // Name underline
  y += 2
  const nw = doc.getTextWidth(fullName)
  setDraw(doc, COLORS.primary)
  doc.setLineWidth(0.8)
  doc.line(cx - nw / 2, y, cx + nw / 2, y)

  // Completion text
  y += 10
  setColor(doc, COLORS.foreground)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const cycleName = classInfo.cycle?.name || 'the program'
  doc.text(`has successfully completed "${cycleName}"`, cx, y, { align: 'center' })
  y += 5.5
  doc.text(`from ${fmtDate(classInfo.start_date)} to ${fmtDate(classInfo.end_date)}`, cx, y, { align: 'center' })

  // Subjects list
  if (subjectNames.length > 0) {
    y += 12
    setColor(doc, COLORS.muted)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('SUBJECTS STUDIED', cx, y, { align: 'center' })
    y += 5
    setColor(doc, COLORS.foreground)
    doc.setFontSize(9)
    const subjectsLine = subjectNames.join('  •  ')
    doc.text(subjectsLine, cx, y, { align: 'center', maxWidth: PAGE_W - MARGIN * 2 - 40 })
  }

  // Overall score
  if (overallScore !== null) {
    y += 12
    setColor(doc, COLORS.muted)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('OVERALL SCORE', cx, y, { align: 'center' })
    y += 7
    setColor(doc, COLORS.primary)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text(overallScore.toFixed(1), cx, y, { align: 'center' })
  }

  // Bottom: date + signature
  const by = PAGE_H - MARGIN - 28
  const lx = MARGIN + 50
  const rx = PAGE_W - MARGIN - 50

  // Date
  setDraw(doc, COLORS.foreground)
  doc.setLineWidth(0.3)
  doc.line(lx - 30, by + 6, lx + 30, by + 6)
  setColor(doc, COLORS.foreground)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(fmtDate(new Date().toISOString()), lx, by + 4, { align: 'center' })
  setColor(doc, COLORS.muted)
  doc.setFontSize(8)
  doc.text('Date of Issue', lx, by + 12, { align: 'center' })

  // Signature
  doc.setLineWidth(0.3)
  setDraw(doc, COLORS.foreground)
  doc.line(rx - 30, by + 6, rx + 30, by + 6)
  const teacher = classInfo.employee
    ? `${classInfo.employee.name || ''} ${classInfo.employee.lastname || ''}`.trim()
    : orgInfo.manager || 'Director'
  setColor(doc, COLORS.foreground)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(teacher, rx, by + 4, { align: 'center' })
  setColor(doc, COLORS.muted)
  doc.setFontSize(8)
  doc.text('Authorized Signature', rx, by + 12, { align: 'center' })

  // Ref ID
  setColor(doc, COLORS.muted)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.text(refId, cx, PAGE_H - MARGIN - 8, { align: 'center' })
}

// ── Public API ────────────────────────────────────────────────────────────────

export function generateSingleCertificate(params) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  drawCertificate(doc, params)
  return doc.output('blob')
}

export async function generateCertificatesZip({ students, orgInfo, classInfo, subjectNames, gradesMap, onProgress }) {
  const zip = new JSZip()

  for (let i = 0; i < students.length; i++) {
    const enrollment = students[i]
    const student = enrollment.student
    const grades = gradesMap.get(enrollment.id) || []

    // Calculate overall average score
    const totals = grades.map((g) => parseFloat(g.total)).filter((n) => !isNaN(n))
    const overallScore = totals.length > 0 ? totals.reduce((a, b) => a + b, 0) / totals.length : null

    const blob = generateSingleCertificate({
      student,
      orgInfo,
      classInfo,
      subjectNames,
      overallScore,
      refId: genRefId(classInfo.id, student.id),
    })

    const safeName = `${student.name}_${student.lastname}`.replace(/[^a-zA-Z0-9_-]/g, '_')
    zip.file(`${safeName}_${student.usid}.pdf`, blob)

    onProgress?.(i + 1, students.length)
    if (i % 5 === 4) await new Promise((r) => setTimeout(r, 0))
  }

  return zip.generateAsync({ type: 'blob' })
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
