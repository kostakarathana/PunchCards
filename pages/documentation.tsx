import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface DocumentationData {
  // Core
  targetCode: string
  documentationType: string
  audience: string
  // Context
  existingDocs: string
  codebaseContext: string
  styleGuide: string
  // Preferences
  detailLevel: number
  technicalDepth: number
  examplesLevel: number
  filesToIgnore: string
  extraInfo: string
  // Advanced - Content
  includeOverview: boolean
  includeInstallation: boolean
  includeQuickStart: boolean
  includeApiReference: boolean
  includeExamples: boolean
  // Advanced - Format
  markdownFlavor: string
  headingStructure: string
  codeBlockStyle: string
  diagramFormat: string
  tableOfContents: boolean
  // Advanced - API Docs
  paramDescriptions: boolean
  returnTypes: boolean
  throwsDocumentation: boolean
  deprecationNotes: boolean
  sinceVersion: string
  // Advanced - Examples
  exampleComplexity: number
  includeEdgeCases: boolean
  includeErrorHandling: boolean
  runableExamples: boolean
  testableExamples: boolean
  // Advanced - Integration
  typedocConfig: string
  jsdocTags: string
  openApiSpec: boolean
  postmanCollection: boolean
  readmeTemplate: string
  // Advanced - Maintenance
  versioningStrategy: string
  changelogIntegration: boolean
  autoGenerateFromTypes: boolean
  linkToSourceCode: boolean
  lastUpdatedTimestamp: boolean
}

const defaultFormData: DocumentationData = {
  targetCode: '',
  documentationType: '',
  audience: '',
  existingDocs: '',
  codebaseContext: '',
  styleGuide: '',
  detailLevel: 3,
  technicalDepth: 3,
  examplesLevel: 3,
  filesToIgnore: '',
  extraInfo: '',
  includeOverview: true,
  includeInstallation: false,
  includeQuickStart: false,
  includeApiReference: true,
  includeExamples: true,
  markdownFlavor: '',
  headingStructure: '',
  codeBlockStyle: '',
  diagramFormat: '',
  tableOfContents: true,
  paramDescriptions: true,
  returnTypes: true,
  throwsDocumentation: true,
  deprecationNotes: false,
  sinceVersion: '',
  exampleComplexity: 3,
  includeEdgeCases: false,
  includeErrorHandling: true,
  runableExamples: false,
  testableExamples: false,
  typedocConfig: '',
  jsdocTags: '',
  openApiSpec: false,
  postmanCollection: false,
  readmeTemplate: '',
  versioningStrategy: '',
  changelogIntegration: false,
  autoGenerateFromTypes: false,
  linkToSourceCode: true,
  lastUpdatedTimestamp: false,
}

export default function Documentation() {
  const router = useRouter()
  const [formData, setFormData] = useState<DocumentationData>(defaultFormData)
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedSections, setAdvancedSections] = useState({
    content: false,
    format: false,
    apiDocs: false,
    examples: false,
    integration: false,
    maintenance: false,
  })

  const toggleAdvanced = (section: keyof typeof advancedSections) => {
    setAdvancedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const getDetailLabel = (val: number) => {
    const labels = ['Minimal - brief descriptions', 'Concise', 'Standard', 'Detailed', 'Comprehensive - exhaustive detail']
    return labels[val - 1]
  }

  const getTechDepthLabel = (val: number) => {
    const labels = ['Beginner - no jargon', 'Basic', 'Intermediate', 'Advanced', 'Expert - assume deep knowledge']
    return labels[val - 1]
  }

  const getExamplesLabel = (val: number) => {
    const labels = ['None', 'Minimal - one basic example', 'Some examples', 'Many examples', 'Extensive - cover all cases']
    return labels[val - 1]
  }

  const getComplexityLabel = (val: number) => {
    const labels = ['Trivial - hello world', 'Simple', 'Moderate', 'Complex', 'Real-world production examples']
    return labels[val - 1]
  }

  const generateXML = () => {
    const xml = `<task_card type="documentation">
  <meta_instruction>
    Follow this documentation workflow:
    0. CONTEXT STUDY: Review the target code thoroughly. Understand its purpose, inputs, outputs, and edge cases.
    1. OUTLINE: Create a documentation structure outline based on the documentation type requested.
    2. DRAFT: Write the documentation following the style guide and detail level specified.
    3. EXAMPLES: Add code examples that demonstrate usage patterns.
    4. REVIEW: Check for accuracy, completeness, and clarity.
    5. FORMAT: Apply proper formatting, links, and cross-references.
  </meta_instruction>

  <documentation_details>
    <target_code>${formData.targetCode}</target_code>
    <documentation_type>${formData.documentationType}</documentation_type>
    <target_audience>${formData.audience}</target_audience>
    <existing_docs>${formData.existingDocs || 'None'}</existing_docs>
    <codebase_context>${formData.codebaseContext || 'Not specified'}</codebase_context>
    <style_guide>${formData.styleGuide || 'Use standard conventions'}</style_guide>
  </documentation_details>

  <preferences>
    <detail_level level="${formData.detailLevel}">${getDetailLabel(formData.detailLevel)}</detail_level>
    <technical_depth level="${formData.technicalDepth}">${getTechDepthLabel(formData.technicalDepth)}</technical_depth>
    <examples_level level="${formData.examplesLevel}">${getExamplesLabel(formData.examplesLevel)}</examples_level>
    <files_to_ignore>${formData.filesToIgnore || 'None'}</files_to_ignore>
    <extra_info>${formData.extraInfo || 'None'}</extra_info>
  </preferences>

  <advanced_config>
    <content_sections>
      <include_overview>${formData.includeOverview ? 'Yes' : 'No'}</include_overview>
      <include_installation>${formData.includeInstallation ? 'Yes' : 'No'}</include_installation>
      <include_quick_start>${formData.includeQuickStart ? 'Yes' : 'No'}</include_quick_start>
      <include_api_reference>${formData.includeApiReference ? 'Yes' : 'No'}</include_api_reference>
      <include_examples>${formData.includeExamples ? 'Yes' : 'No'}</include_examples>
    </content_sections>
    <formatting>
      <markdown_flavor>${formData.markdownFlavor || 'GitHub Flavored'}</markdown_flavor>
      <heading_structure>${formData.headingStructure || 'Standard H1-H6'}</heading_structure>
      <code_block_style>${formData.codeBlockStyle || 'Fenced with language'}</code_block_style>
      <diagram_format>${formData.diagramFormat || 'Mermaid'}</diagram_format>
      <table_of_contents>${formData.tableOfContents ? 'Yes' : 'No'}</table_of_contents>
    </formatting>
    <api_documentation>
      <param_descriptions>${formData.paramDescriptions ? 'Yes' : 'No'}</param_descriptions>
      <return_types>${formData.returnTypes ? 'Yes' : 'No'}</return_types>
      <throws_documentation>${formData.throwsDocumentation ? 'Yes' : 'No'}</throws_documentation>
      <deprecation_notes>${formData.deprecationNotes ? 'Yes' : 'No'}</deprecation_notes>
      <since_version>${formData.sinceVersion || 'Not tracked'}</since_version>
    </api_documentation>
    <examples_config>
      <example_complexity level="${formData.exampleComplexity}">${getComplexityLabel(formData.exampleComplexity)}</example_complexity>
      <include_edge_cases>${formData.includeEdgeCases ? 'Yes' : 'No'}</include_edge_cases>
      <include_error_handling>${formData.includeErrorHandling ? 'Yes' : 'No'}</include_error_handling>
      <runable_examples>${formData.runableExamples ? 'Yes' : 'No'}</runable_examples>
      <testable_examples>${formData.testableExamples ? 'Yes' : 'No'}</testable_examples>
    </examples_config>
    <integration>
      <typedoc_config>${formData.typedocConfig || 'Not using'}</typedoc_config>
      <jsdoc_tags>${formData.jsdocTags || 'Standard tags'}</jsdoc_tags>
      <openapi_spec>${formData.openApiSpec ? 'Yes' : 'No'}</openapi_spec>
      <postman_collection>${formData.postmanCollection ? 'Yes' : 'No'}</postman_collection>
      <readme_template>${formData.readmeTemplate || 'None'}</readme_template>
    </integration>
    <maintenance>
      <versioning_strategy>${formData.versioningStrategy || 'None'}</versioning_strategy>
      <changelog_integration>${formData.changelogIntegration ? 'Yes' : 'No'}</changelog_integration>
      <auto_generate_from_types>${formData.autoGenerateFromTypes ? 'Yes' : 'No'}</auto_generate_from_types>
      <link_to_source_code>${formData.linkToSourceCode ? 'Yes' : 'No'}</link_to_source_code>
      <last_updated_timestamp>${formData.lastUpdatedTimestamp ? 'Yes' : 'No'}</last_updated_timestamp>
    </maintenance>
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
    const blob = new Blob([xmlOutput], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'documentation_task.xml'
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
        <title>Documentation - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">DOCUMENTATION TASK CARD</h2>
            <p className="typewriter-slow">
              Generate comprehensive documentation for your codebase
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            {/* CORE DETAILS */}
            <div className="form-section">
              <h3>Core Details</h3>
              
              <div className="form-group">
                <label htmlFor="targetCode">Target Code / Files *</label>
                <textarea id="targetCode" name="targetCode" value={formData.targetCode} onChange={handleInputChange} placeholder="What code needs documentation? List files, functions, classes, or modules..." required />
              </div>

              <div className="form-group">
                <label htmlFor="documentationType">Documentation Type *</label>
                <textarea id="documentationType" name="documentationType" value={formData.documentationType} onChange={handleInputChange} placeholder="e.g., README, API docs, JSDoc comments, user guide, architecture docs..." required />
              </div>

              <div className="form-group">
                <label htmlFor="audience">Target Audience *</label>
                <textarea id="audience" name="audience" value={formData.audience} onChange={handleInputChange} placeholder="Who will read this? e.g., developers, end users, new team members..." required />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('content')}>
                {advancedSections.content ? '− ADVANCED CONTENT' : '+ ADVANCED CONTENT'}
              </button>

              {advancedSections.content && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeOverview" checked={formData.includeOverview} onChange={handleCheckboxChange} />
                      <span>Include overview/introduction section</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeInstallation" checked={formData.includeInstallation} onChange={handleCheckboxChange} />
                      <span>Include installation instructions</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeQuickStart" checked={formData.includeQuickStart} onChange={handleCheckboxChange} />
                      <span>Include quick start guide</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeApiReference" checked={formData.includeApiReference} onChange={handleCheckboxChange} />
                      <span>Include API reference</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeExamples" checked={formData.includeExamples} onChange={handleCheckboxChange} />
                      <span>Include usage examples</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* CONTEXT */}
            <div className="form-section">
              <h3>Context</h3>

              <div className="form-group">
                <label htmlFor="existingDocs">Existing Documentation</label>
                <textarea id="existingDocs" name="existingDocs" value={formData.existingDocs} onChange={handleInputChange} placeholder="Any existing docs to update or use as reference..." />
              </div>

              <div className="form-group">
                <label htmlFor="codebaseContext">Codebase Context</label>
                <textarea id="codebaseContext" name="codebaseContext" value={formData.codebaseContext} onChange={handleInputChange} placeholder="Brief description of the project and its purpose..." />
              </div>

              <div className="form-group">
                <label htmlFor="styleGuide">Documentation Style Guide</label>
                <textarea id="styleGuide" name="styleGuide" value={formData.styleGuide} onChange={handleInputChange} placeholder="Any specific style conventions to follow..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('format')}>
                {advancedSections.format ? '− ADVANCED FORMATTING' : '+ ADVANCED FORMATTING'}
              </button>

              {advancedSections.format && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="markdownFlavor">Markdown Flavor</label>
                    <input type="text" id="markdownFlavor" name="markdownFlavor" value={formData.markdownFlavor} onChange={handleInputChange} placeholder="e.g., GitHub Flavored, CommonMark, MDX..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="headingStructure">Heading Structure</label>
                    <input type="text" id="headingStructure" name="headingStructure" value={formData.headingStructure} onChange={handleInputChange} placeholder="e.g., Start at H2, max depth H4..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="codeBlockStyle">Code Block Style</label>
                    <input type="text" id="codeBlockStyle" name="codeBlockStyle" value={formData.codeBlockStyle} onChange={handleInputChange} placeholder="e.g., Fenced, indented, with line numbers..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="diagramFormat">Diagram Format</label>
                    <input type="text" id="diagramFormat" name="diagramFormat" value={formData.diagramFormat} onChange={handleInputChange} placeholder="e.g., Mermaid, PlantUML, ASCII art..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="tableOfContents" checked={formData.tableOfContents} onChange={handleCheckboxChange} />
                      <span>Generate table of contents</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('apiDocs')}>
                {advancedSections.apiDocs ? '− ADVANCED API DOCS' : '+ ADVANCED API DOCS'}
              </button>

              {advancedSections.apiDocs && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="paramDescriptions" checked={formData.paramDescriptions} onChange={handleCheckboxChange} />
                      <span>Include parameter descriptions</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="returnTypes" checked={formData.returnTypes} onChange={handleCheckboxChange} />
                      <span>Document return types</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="throwsDocumentation" checked={formData.throwsDocumentation} onChange={handleCheckboxChange} />
                      <span>Document thrown errors/exceptions</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="deprecationNotes" checked={formData.deprecationNotes} onChange={handleCheckboxChange} />
                      <span>Include deprecation notes</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sinceVersion">@since Version Tracking</label>
                    <input type="text" id="sinceVersion" name="sinceVersion" value={formData.sinceVersion} onChange={handleInputChange} placeholder="e.g., Track from v2.0.0..." />
                  </div>
                </div>
              )}
            </div>

            {/* PREFERENCES */}
            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Detail Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.detailLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('detailLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getDetailLabel(formData.detailLevel)}</span>
              </div>

              <div className="form-group">
                <label>Technical Depth</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.technicalDepth === val ? 'active' : ''}`} onClick={() => handleRatingChange('technicalDepth', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getTechDepthLabel(formData.technicalDepth)}</span>
              </div>

              <div className="form-group">
                <label>Examples Level</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.examplesLevel === val ? 'active' : ''}`} onClick={() => handleRatingChange('examplesLevel', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getExamplesLabel(formData.examplesLevel)}</span>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea id="filesToIgnore" name="filesToIgnore" value={formData.filesToIgnore} onChange={handleInputChange} placeholder="Files that should not be documented..." />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea id="extraInfo" name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Any additional requirements or notes..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('examples')}>
                {advancedSections.examples ? '− ADVANCED EXAMPLES' : '+ ADVANCED EXAMPLES'}
              </button>

              {advancedSections.examples && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label>Example Complexity</label>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" className={`rating-btn ${formData.exampleComplexity === val ? 'active' : ''}`} onClick={() => handleRatingChange('exampleComplexity', val)}>{val}</button>
                      ))}
                    </div>
                    <span className="rating-label">{getComplexityLabel(formData.exampleComplexity)}</span>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeEdgeCases" checked={formData.includeEdgeCases} onChange={handleCheckboxChange} />
                      <span>Include edge case examples</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="includeErrorHandling" checked={formData.includeErrorHandling} onChange={handleCheckboxChange} />
                      <span>Include error handling examples</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="runableExamples" checked={formData.runableExamples} onChange={handleCheckboxChange} />
                      <span>Make examples copy-paste runable</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="testableExamples" checked={formData.testableExamples} onChange={handleCheckboxChange} />
                      <span>Include testable example snippets</span>
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
                    <label htmlFor="typedocConfig">TypeDoc Configuration</label>
                    <textarea id="typedocConfig" name="typedocConfig" value={formData.typedocConfig} onChange={handleInputChange} placeholder="TypeDoc specific settings..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="jsdocTags">JSDoc Tags to Use</label>
                    <input type="text" id="jsdocTags" name="jsdocTags" value={formData.jsdocTags} onChange={handleInputChange} placeholder="e.g., @param, @returns, @example, @see..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="openApiSpec" checked={formData.openApiSpec} onChange={handleCheckboxChange} />
                      <span>Generate OpenAPI/Swagger spec</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="postmanCollection" checked={formData.postmanCollection} onChange={handleCheckboxChange} />
                      <span>Generate Postman collection</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="readmeTemplate">README Template</label>
                    <input type="text" id="readmeTemplate" name="readmeTemplate" value={formData.readmeTemplate} onChange={handleInputChange} placeholder="e.g., Standard-readme, custom template..." />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('maintenance')}>
                {advancedSections.maintenance ? '− ADVANCED MAINTENANCE' : '+ ADVANCED MAINTENANCE'}
              </button>

              {advancedSections.maintenance && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label htmlFor="versioningStrategy">Versioning Strategy</label>
                    <input type="text" id="versioningStrategy" name="versioningStrategy" value={formData.versioningStrategy} onChange={handleInputChange} placeholder="e.g., Semantic versioning in docs..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="changelogIntegration" checked={formData.changelogIntegration} onChange={handleCheckboxChange} />
                      <span>Link to changelog</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="autoGenerateFromTypes" checked={formData.autoGenerateFromTypes} onChange={handleCheckboxChange} />
                      <span>Auto-generate from TypeScript types</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="linkToSourceCode" checked={formData.linkToSourceCode} onChange={handleCheckboxChange} />
                      <span>Link to source code</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="lastUpdatedTimestamp" checked={formData.lastUpdatedTimestamp} onChange={handleCheckboxChange} />
                      <span>Include last updated timestamp</span>
                    </label>
                  </div>
                </div>
              )}
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
                <span className="file-name">documentation_task.xml</span>
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
