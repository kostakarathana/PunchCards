import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface FeatureRequestData {
  // Punchcard Meta
  punchcardTitle: string
  documentationDepth: number
  // Core
  goal: string
  userStory: string
  acceptanceCriteria: string
  // Technical
  constraints: string
  referenceFiles: string
  techStack: string
  stylingGuidelines: string
  // Preferences
  creativityLevel: number
  scopeLevel: number
  documentationLevel: number
  filesToIgnore: string
  extraInfo: string
  // Advanced - Architecture
  designPatterns: string
  folderStructure: string
  namingConventions: string
  stateManagement: string
  apiDesign: string
  // Advanced - Data
  dataModels: string
  databaseSchema: string
  validationRules: string
  dataTransformations: string
  caching: string
  // Advanced - UI/UX
  componentLibrary: string
  responsiveBreakpoints: string
  accessibilityLevel: string
  animationPrefs: string
  darkModeSupport: boolean
  // Advanced - Integration
  apiEndpoints: string
  authRequirements: string
  thirdPartyServices: string
  webhooks: string
  eventSystem: string
  // Advanced - Performance
  lazyLoading: boolean
  bundleSizeLimit: string
  renderingStrategy: string
  optimisticUpdates: boolean
  infiniteScroll: boolean
  // Advanced - Quality
  errorHandlingStrategy: string
  loggingLevel: number
  monitoringIntegration: string
  featureFlags: boolean
  abTesting: boolean
}

const defaultFormData: FeatureRequestData = {
  punchcardTitle: '',
  documentationDepth: 3,
  goal: '',
  userStory: '',
  acceptanceCriteria: '',
  constraints: '',
  referenceFiles: '',
  techStack: '',
  stylingGuidelines: '',
  creativityLevel: 3,
  scopeLevel: 3,
  documentationLevel: 3,
  filesToIgnore: '',
  extraInfo: '',
  designPatterns: '',
  folderStructure: '',
  namingConventions: '',
  stateManagement: '',
  apiDesign: '',
  dataModels: '',
  databaseSchema: '',
  validationRules: '',
  dataTransformations: '',
  caching: '',
  componentLibrary: '',
  responsiveBreakpoints: '',
  accessibilityLevel: '',
  animationPrefs: '',
  darkModeSupport: false,
  apiEndpoints: '',
  authRequirements: '',
  thirdPartyServices: '',
  webhooks: '',
  eventSystem: '',
  lazyLoading: false,
  bundleSizeLimit: '',
  renderingStrategy: '',
  optimisticUpdates: false,
  infiniteScroll: false,
  errorHandlingStrategy: '',
  loggingLevel: 3,
  monitoringIntegration: '',
  featureFlags: false,
  abTesting: false,
}

export default function FeatureRequest() {
  const router = useRouter()
  const [formData, setFormData] = useState<FeatureRequestData>(defaultFormData)
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedSections, setAdvancedSections] = useState({
    architecture: false,
    data: false,
    uiux: false,
    integration: false,
    performance: false,
    quality: false,
  })

  const toggleAdvanced = (section: keyof typeof advancedSections) => {
    setAdvancedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRatingChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getCreativityLabel = (val: number) => {
    const labels = ['Conservative - follow patterns strictly', 'Cautious - minimal innovation', 'Balanced', 'Open - suggest improvements', 'Creative - propose best solutions']
    return labels[val - 1]
  }

  const getScopeLabel = (val: number) => {
    const labels = ['MVP - bare minimum', 'Lean - essential only', 'Standard', 'Complete - polish included', 'Comprehensive - full bells & whistles']
    return labels[val - 1]
  }

  const getDocumentationLabel = (val: number) => {
    const labels = ['None - just code', 'Minimal - key comments', 'Standard', 'Detailed - inline docs', 'Extensive - full documentation']
    return labels[val - 1]
  }

  const getLoggingLabel = (val: number) => {
    const labels = ['None', 'Errors only', 'Standard', 'Verbose', 'Debug everything']
    return labels[val - 1]
  }

  const getDocDepthLabel = (val: number) => {
    const labels = ['Minimal - snappy dot points', 'Brief - key points only', 'Standard - balanced detail', 'Detailed - thorough coverage', 'Deep - comprehensive documentation']
    return labels[val - 1]
  }

  const sanitizeFilename = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_')
      .substring(0, 50) || 'untitled'
  }

  const generateXML = () => {
    const xml = `<task_card type="feature_request" title="${formData.punchcardTitle || 'Untitled Feature Request'}">
  <meta_instruction>
    Adopt a "Skeleton-of-Thought" approach:
    0. CONTEXT STUDY: Review the existing project structure, design patterns, and utility libraries. Ensure new additions align with established coding conventions.
    1. ARCHITECTURE: Summarize the files you need to create or modify based on your study.
    2. CONTRACTS: Write the Interfaces, Types, or DB Schemas FIRST.
    3. STOP: Ask for my approval on the interfaces before writing logic.
    4. IMPLEMENT: Once approved, write the implementation logic.
  </meta_instruction>

  <documentation_requirement>
    <instruction>After completing this task, create a markdown file documenting the work done.</instruction>
    <output_path>punchcards/${sanitizeFilename(formData.punchcardTitle)}.md</output_path>
    <detail_level level="${formData.documentationDepth}">${getDocDepthLabel(formData.documentationDepth)}</detail_level>
    <format>
      Level 1: Task title, one-line summary, files changed (bullet list)
      Level 2: Above + brief problem/solution description
      Level 3: Above + key decisions made, testing notes
      Level 4: Above + detailed reasoning, edge cases considered, related issues
      Level 5: Above + full context, alternative approaches considered, future considerations
    </format>
  </documentation_requirement>

  <feature_details>
    <goal>${formData.goal}</goal>
    <user_story>${formData.userStory}</user_story>
    <acceptance_criteria>${formData.acceptanceCriteria || 'Not specified - use your judgment'}</acceptance_criteria>
    <constraints>${formData.constraints || 'None specified'}</constraints>
    <reference_files>${formData.referenceFiles || 'None specified - explore codebase'}</reference_files>
    <tech_stack>${formData.techStack || 'Follow existing project patterns'}</tech_stack>
    <styling_guidelines>${formData.stylingGuidelines || 'Follow existing patterns'}</styling_guidelines>
  </feature_details>

  <preferences>
    <creativity_level level="${formData.creativityLevel}">${getCreativityLabel(formData.creativityLevel)}</creativity_level>
    <scope_level level="${formData.scopeLevel}">${getScopeLabel(formData.scopeLevel)}</scope_level>
    <documentation_level level="${formData.documentationLevel}">${getDocumentationLabel(formData.documentationLevel)}</documentation_level>
    <files_to_ignore>${formData.filesToIgnore || 'None'}</files_to_ignore>
    <extra_info>${formData.extraInfo || 'None'}</extra_info>
  </preferences>

  <advanced_config>
    <architecture>
      <design_patterns>${formData.designPatterns || 'Follow existing'}</design_patterns>
      <folder_structure>${formData.folderStructure || 'Follow existing'}</folder_structure>
      <naming_conventions>${formData.namingConventions || 'Follow existing'}</naming_conventions>
      <state_management>${formData.stateManagement || 'Follow existing'}</state_management>
      <api_design>${formData.apiDesign || 'RESTful default'}</api_design>
    </architecture>
    <data>
      <data_models>${formData.dataModels || 'Not specified'}</data_models>
      <database_schema>${formData.databaseSchema || 'Not specified'}</database_schema>
      <validation_rules>${formData.validationRules || 'Standard validation'}</validation_rules>
      <data_transformations>${formData.dataTransformations || 'None specified'}</data_transformations>
      <caching_strategy>${formData.caching || 'Default'}</caching_strategy>
    </data>
    <ui_ux>
      <component_library>${formData.componentLibrary || 'Use existing'}</component_library>
      <responsive_breakpoints>${formData.responsiveBreakpoints || 'Standard breakpoints'}</responsive_breakpoints>
      <accessibility_level>${formData.accessibilityLevel || 'WCAG AA'}</accessibility_level>
      <animation_preferences>${formData.animationPrefs || 'Subtle'}</animation_preferences>
      <dark_mode_support>${formData.darkModeSupport ? 'Yes' : 'No'}</dark_mode_support>
    </ui_ux>
    <integration>
      <api_endpoints>${formData.apiEndpoints || 'Not specified'}</api_endpoints>
      <auth_requirements>${formData.authRequirements || 'Follow existing auth'}</auth_requirements>
      <third_party_services>${formData.thirdPartyServices || 'None'}</third_party_services>
      <webhooks>${formData.webhooks || 'None'}</webhooks>
      <event_system>${formData.eventSystem || 'None'}</event_system>
    </integration>
    <performance>
      <lazy_loading>${formData.lazyLoading ? 'Yes' : 'No'}</lazy_loading>
      <bundle_size_limit>${formData.bundleSizeLimit || 'No strict limit'}</bundle_size_limit>
      <rendering_strategy>${formData.renderingStrategy || 'Default'}</rendering_strategy>
      <optimistic_updates>${formData.optimisticUpdates ? 'Yes' : 'No'}</optimistic_updates>
      <infinite_scroll>${formData.infiniteScroll ? 'Yes' : 'No'}</infinite_scroll>
    </performance>
    <quality>
      <error_handling_strategy>${formData.errorHandlingStrategy || 'Standard try-catch'}</error_handling_strategy>
      <logging_level level="${formData.loggingLevel}">${getLoggingLabel(formData.loggingLevel)}</logging_level>
      <monitoring_integration>${formData.monitoringIntegration || 'None'}</monitoring_integration>
      <feature_flags>${formData.featureFlags ? 'Yes' : 'No'}</feature_flags>
      <ab_testing>${formData.abTesting ? 'Yes' : 'No'}</ab_testing>
    </quality>
  </advanced_config>
</task_card>`
    setXmlOutput(xml)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(xmlOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadXML = () => {
    const filename = `${sanitizeFilename(formData.punchcardTitle)}_feature_request.xml`
    const blob = new Blob([xmlOutput], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetForm = () => {
    setFormData(defaultFormData)
    setXmlOutput('')
    setCopied(false)
  }

  return (
    <>
      <Head>
        <title>Feature Request - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">FEATURE REQUEST TASK CARD</h2>
            <p className="typewriter-slow">
              Build new features with a Skeleton-of-Thought architecture review process
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            {/* PUNCHCARD TITLE */}
            <div className="form-section punchcard-title-section">
              <div className="form-group">
                <label htmlFor="punchcardTitle">Punchcard Title *</label>
                <input type="text" id="punchcardTitle" name="punchcardTitle" value={formData.punchcardTitle} onChange={handleInputChange} placeholder="e.g., add-user-dashboard, implement-search" required />
                <span className="field-hint">Used for documentation filename and tracking</span>
              </div>
            </div>

            {/* CORE DETAILS */}
            <div className="form-section">
              <h3>Core Details</h3>

              <div className="form-group">
                <label htmlFor="goal">Goal *</label>
                <textarea id="goal" name="goal" value={formData.goal} onChange={handleInputChange} placeholder="What is the main objective of this feature?" required />
              </div>

              <div className="form-group">
                <label htmlFor="userStory">User Story *</label>
                <textarea id="userStory" name="userStory" value={formData.userStory} onChange={handleInputChange} placeholder="As a [user type], I want to [action] so that [benefit]..." required />
              </div>

              <div className="form-group">
                <label htmlFor="acceptanceCriteria">Acceptance Criteria</label>
                <textarea id="acceptanceCriteria" name="acceptanceCriteria" value={formData.acceptanceCriteria} onChange={handleInputChange} placeholder="How do we know when this is done? List specific conditions..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('architecture')}>
                {advancedSections.architecture ? '− ADVANCED ARCHITECTURE' : '+ ADVANCED ARCHITECTURE'}
              </button>

              {advancedSections.architecture && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="designPatterns">Design Patterns</label>
                    <textarea id="designPatterns" name="designPatterns" value={formData.designPatterns} onChange={handleInputChange} placeholder="e.g., Repository pattern, Factory, Observer..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="folderStructure">Folder Structure</label>
                    <textarea id="folderStructure" name="folderStructure" value={formData.folderStructure} onChange={handleInputChange} placeholder="Where should new files be placed? Any specific structure?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="namingConventions">Naming Conventions</label>
                    <textarea id="namingConventions" name="namingConventions" value={formData.namingConventions} onChange={handleInputChange} placeholder="e.g., camelCase for functions, PascalCase for components..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stateManagement">State Management</label>
                    <input type="text" id="stateManagement" name="stateManagement" value={formData.stateManagement} onChange={handleInputChange} placeholder="e.g., Redux, Zustand, Context, Jotai..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apiDesign">API Design Style</label>
                    <input type="text" id="apiDesign" name="apiDesign" value={formData.apiDesign} onChange={handleInputChange} placeholder="e.g., REST, GraphQL, tRPC, gRPC..." />
                  </div>
                </div>
              )}
            </div>

            {/* TECHNICAL CONTEXT */}
            <div className="form-section">
              <h3>Technical Context</h3>

              <div className="form-group">
                <label htmlFor="constraints">Constraints</label>
                <textarea id="constraints" name="constraints" value={formData.constraints} onChange={handleInputChange} placeholder="Any technical constraints, dependencies, or requirements?" />
              </div>

              <div className="form-group">
                <label htmlFor="referenceFiles">Reference Files</label>
                <textarea id="referenceFiles" name="referenceFiles" value={formData.referenceFiles} onChange={handleInputChange} placeholder="List any relevant files or modules for reference..." />
              </div>

              <div className="form-group">
                <label htmlFor="techStack">Preferred Tech Stack / Libraries</label>
                <input type="text" id="techStack" name="techStack" value={formData.techStack} onChange={handleInputChange} placeholder="e.g., React, TailwindCSS, Prisma..." />
              </div>

              <div className="form-group">
                <label htmlFor="stylingGuidelines">Styling Guidelines</label>
                <textarea id="stylingGuidelines" name="stylingGuidelines" value={formData.stylingGuidelines} onChange={handleInputChange} placeholder="Any specific styling requirements, design system to follow..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('data')}>
                {advancedSections.data ? '− ADVANCED DATA' : '+ ADVANCED DATA'}
              </button>

              {advancedSections.data && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="dataModels">Data Models</label>
                    <textarea id="dataModels" name="dataModels" value={formData.dataModels} onChange={handleInputChange} placeholder="Describe the data structures needed..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="databaseSchema">Database Schema</label>
                    <textarea id="databaseSchema" name="databaseSchema" value={formData.databaseSchema} onChange={handleInputChange} placeholder="Any specific database tables, relations, indexes..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="validationRules">Validation Rules</label>
                    <textarea id="validationRules" name="validationRules" value={formData.validationRules} onChange={handleInputChange} placeholder="e.g., Email format, min/max lengths, custom validators..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dataTransformations">Data Transformations</label>
                    <textarea id="dataTransformations" name="dataTransformations" value={formData.dataTransformations} onChange={handleInputChange} placeholder="Any data mapping or transformation requirements..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="caching">Caching Strategy</label>
                    <input type="text" id="caching" name="caching" value={formData.caching} onChange={handleInputChange} placeholder="e.g., Redis, in-memory, SWR, React Query..." />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('uiux')}>
                {advancedSections.uiux ? '− ADVANCED UI/UX' : '+ ADVANCED UI/UX'}
              </button>

              {advancedSections.uiux && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="componentLibrary">Component Library</label>
                    <input type="text" id="componentLibrary" name="componentLibrary" value={formData.componentLibrary} onChange={handleInputChange} placeholder="e.g., shadcn/ui, Radix, MUI, Chakra..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="responsiveBreakpoints">Responsive Breakpoints</label>
                    <input type="text" id="responsiveBreakpoints" name="responsiveBreakpoints" value={formData.responsiveBreakpoints} onChange={handleInputChange} placeholder="e.g., mobile-first, 768px, 1024px, 1280px..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="accessibilityLevel">Accessibility Level</label>
                    <input type="text" id="accessibilityLevel" name="accessibilityLevel" value={formData.accessibilityLevel} onChange={handleInputChange} placeholder="e.g., WCAG A, AA, AAA..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="animationPrefs">Animation Preferences</label>
                    <input type="text" id="animationPrefs" name="animationPrefs" value={formData.animationPrefs} onChange={handleInputChange} placeholder="e.g., None, subtle, smooth, playful..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="darkModeSupport" checked={formData.darkModeSupport} onChange={handleCheckboxChange} />
                      <span>Include dark mode support</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('integration')}>
                {advancedSections.integration ? '− ADVANCED INTEGRATION' : '+ ADVANCED INTEGRATION'}
              </button>

              {advancedSections.integration && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="apiEndpoints">API Endpoints</label>
                    <textarea id="apiEndpoints" name="apiEndpoints" value={formData.apiEndpoints} onChange={handleInputChange} placeholder="List the API endpoints needed..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="authRequirements">Auth Requirements</label>
                    <textarea id="authRequirements" name="authRequirements" value={formData.authRequirements} onChange={handleInputChange} placeholder="e.g., JWT, OAuth, API keys, roles..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="thirdPartyServices">Third-Party Services</label>
                    <textarea id="thirdPartyServices" name="thirdPartyServices" value={formData.thirdPartyServices} onChange={handleInputChange} placeholder="e.g., Stripe, SendGrid, AWS S3..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="webhooks">Webhooks</label>
                    <textarea id="webhooks" name="webhooks" value={formData.webhooks} onChange={handleInputChange} placeholder="Any webhook integrations needed..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventSystem">Event System</label>
                    <input type="text" id="eventSystem" name="eventSystem" value={formData.eventSystem} onChange={handleInputChange} placeholder="e.g., EventEmitter, pub/sub, message queue..." />
                  </div>
                </div>
              )}
            </div>

            {/* PREFERENCES */}
            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Creativity Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.creativityLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('creativityLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getCreativityLabel(formData.creativityLevel)}</span>
              </div>

              <div className="form-group">
                <label>Scope Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.scopeLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('scopeLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getScopeLabel(formData.scopeLevel)}</span>
              </div>

              <div className="form-group">
                <label>Documentation Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.documentationLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('documentationLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getDocumentationLabel(formData.documentationLevel)}</span>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea id="filesToIgnore" name="filesToIgnore" value={formData.filesToIgnore} onChange={handleInputChange} placeholder="List any files or folders that should NOT be modified..." />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea id="extraInfo" name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Any additional context, inspiration, or notes..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('performance')}>
                {advancedSections.performance ? '− ADVANCED PERFORMANCE' : '+ ADVANCED PERFORMANCE'}
              </button>

              {advancedSections.performance && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="lazyLoading" checked={formData.lazyLoading} onChange={handleCheckboxChange} />
                      <span>Enable lazy loading</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bundleSizeLimit">Bundle Size Limit</label>
                    <input type="text" id="bundleSizeLimit" name="bundleSizeLimit" value={formData.bundleSizeLimit} onChange={handleInputChange} placeholder="e.g., Max 100KB for this feature..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="renderingStrategy">Rendering Strategy</label>
                    <input type="text" id="renderingStrategy" name="renderingStrategy" value={formData.renderingStrategy} onChange={handleInputChange} placeholder="e.g., SSR, SSG, CSR, ISR..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="optimisticUpdates" checked={formData.optimisticUpdates} onChange={handleCheckboxChange} />
                      <span>Use optimistic updates</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="infiniteScroll" checked={formData.infiniteScroll} onChange={handleCheckboxChange} />
                      <span>Implement infinite scroll (if applicable)</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('quality')}>
                {advancedSections.quality ? '− ADVANCED QUALITY' : '+ ADVANCED QUALITY'}
              </button>

              {advancedSections.quality && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="errorHandlingStrategy">Error Handling Strategy</label>
                    <textarea id="errorHandlingStrategy" name="errorHandlingStrategy" value={formData.errorHandlingStrategy} onChange={handleInputChange} placeholder="e.g., Error boundaries, toast notifications, retry logic..." />
                  </div>
                  <div className="form-group">
                    <label>Logging Level</label>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" className={`rating-btn ${formData.loggingLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('loggingLevel', val)}>{val}</button>
                      ))}
                    </div>
                    <span className="rating-label">{getLoggingLabel(formData.loggingLevel)}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="monitoringIntegration">Monitoring Integration</label>
                    <input type="text" id="monitoringIntegration" name="monitoringIntegration" value={formData.monitoringIntegration} onChange={handleInputChange} placeholder="e.g., Sentry, LogRocket, DataDog..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="featureFlags" checked={formData.featureFlags} onChange={handleCheckboxChange} />
                      <span>Use feature flags</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="abTesting" checked={formData.abTesting} onChange={handleCheckboxChange} />
                      <span>Support A/B testing</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* DOCUMENTATION DEPTH */}
            <div className="form-section documentation-depth-section">
              <h3>Documentation</h3>
              <div className="form-group">
                <label>Documentation Depth</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.documentationDepth === val ? 'active' : ''}`} onClick={() => handleRatingChange('documentationDepth', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getDocDepthLabel(formData.documentationDepth)}</span>
                <span className="field-hint">How detailed should the punchcard documentation be?</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Generate XML</button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Reset Form</button>
            </div>
          </form>

          {xmlOutput && (
            <div className="file-card">
              <div className="file-card-header">
                <span className="file-icon">[ ]</span>
                <span className="file-name">{sanitizeFilename(formData.punchcardTitle)}_feature_request.xml</span>
              </div>
              <div className="file-card-actions">
                <button className="file-btn" onClick={downloadXML}>DOWNLOAD</button>
                <button className={`file-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
              {copied && <div className="file-card-message">Copied to clipboard</div>}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
