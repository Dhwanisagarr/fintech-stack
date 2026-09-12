import { FINTECH_APP_DATABASE } from '../lib/apps-db.js'

function validateDatabase() {
  console.log('==================================================')
  console.log('       FINTECH STACK OPTIMIZER - DATA AUDIT       ')
  console.log('==================================================\n')

  let errors = []
  let warnings = []
  let verifiedCount = 0
  let discontinuedCount = 0
  const seenIds = new Set()

  FINTECH_APP_DATABASE.forEach((app, index) => {
    const prefix = `[App #${index + 1}: ${app.name || 'UNKNOWN'}]`

    // 1. Check duplicate ID
    if (!app.id) {
      errors.push(`${prefix} Missing required field 'id'`)
    } else if (seenIds.has(app.id.toLowerCase())) {
      errors.push(`${prefix} Duplicate ID '${app.id}' found`)
    } else {
      seenIds.add(app.id.toLowerCase())
    }

    // 2. Check basic details
    if (!app.name) errors.push(`${prefix} Missing 'name'`)
    if (!app.category) errors.push(`${prefix} Missing 'category'`)
    if (!app.domain) errors.push(`${prefix} Missing 'domain'`)
    if (!app.website || !app.website.startsWith('http')) errors.push(`${prefix} Missing or invalid 'website' URL`)

    // 3. Status check
    if (!app.status || !['active', 'discontinued', 'unavailable'].includes(app.status)) {
      errors.push(`${prefix} Missing or invalid 'status'`)
    } else if (app.status === 'discontinued') {
      discontinuedCount++
    }

    // 4. Regulatory & Verification check
    if (!app.regulatory || !app.regulatory.body) {
      warnings.push(`${prefix} Missing regulatory oversight metadata`)
    }

    if (!app.last_verified_at) {
      errors.push(`${prefix} Missing 'last_verified_at' timestamp`)
    }

    if (!app.verification_sources || !Array.isArray(app.verification_sources) || app.verification_sources.length === 0) {
      errors.push(`${prefix} Missing verification sources/citations`)
    } else {
      app.verification_sources.forEach((src, idx) => {
        if (!src.url || !src.url.startsWith('http')) {
          errors.push(`${prefix} Verification source #${idx + 1} has invalid URL`)
        }
      })
      verifiedCount++
    }

    // 5. Capabilities & Facts check
    if (!app.capabilities || !Array.isArray(app.capabilities) || app.capabilities.length === 0) {
      errors.push(`${prefix} Missing capabilities array`)
    }

    if (!app.verified_facts || !Array.isArray(app.verified_facts) || app.verified_facts.length === 0) {
      warnings.push(`${prefix} Missing structured 'verified_facts'`)
    }
  })

  console.log(`TOTAL RECORDS AUDITED: ${FINTECH_APP_DATABASE.length}`)
  console.log(`VERIFIED RECORDS:       ${verifiedCount}/${FINTECH_APP_DATABASE.length}`)
  console.log(`ACTIVE PRODUCTS:        ${FINTECH_APP_DATABASE.length - discontinuedCount}`)
  console.log(`DISCONTINUED PRODUCTS:  ${discontinuedCount}`)
  console.log(`ERRORS FOUND:           ${errors.length}`)
  console.log(`WARNINGS FOUND:         ${warnings.length}\n`)

  if (errors.length > 0) {
    console.log('--- DATA AUDIT ERRORS ---')
    errors.forEach((err) => console.error(`❌ ${err}`))
    console.log('\n')
  }

  if (warnings.length > 0) {
    console.log('--- DATA AUDIT WARNINGS ---')
    warnings.forEach((warn) => console.warn(`⚠️ ${warn}`))
    console.log('\n')
  }

  if (errors.length === 0) {
    console.log('✅ DATA AUDIT PASSED 100%! All fintech app records are structurally sound and verified.\n')
    process.exit(0)
  } else {
    console.log('❌ DATA AUDIT FAILED. Please fix the reported data errors.\n')
    process.exit(1)
  }
}

validateDatabase()
