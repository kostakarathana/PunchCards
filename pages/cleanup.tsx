import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface CleanupData {
  // Core
  targetCode: string
  cleanupGoals: string
  cleanupTypes: string
  // Context
  codebaseAge: string
  knownIssues: string
  constraints: string
  // Preferences
  aggressiveness: number
  preserveComments: number
  testingRequired: number
  filesToIgnore: string
  extraInfo: string
  // Advanced - Dead Code
  removeUnusedImports: boolean
  removeUnusedVariables: boolean
  removeUnusedFunctions: boolean
  removeUnreachableCode: boolean
  removeDeprecatedCode: boolean
  // Advanced - Formatting
  consistentIndentation: boolean
  lineEndings: string
  trailingWhitespace: boolean
  maxLineLength: string
  bracesStyle: string
  // Advanced - Structure
  simplifyConditionals: boolean
  extractMagicNumbers: boolean
  removeNestedTernaries: boolean
  flattenCallbacks: boolean
  consolidateDuplicates: boolean
  // Advanced - Dependencies
  removeUnusedDeps: boolean
  updateOutdatedDeps: boolean
  consolidateSimilarDeps: boolean
  removePeerDepWarnings: boolean
  auditVulnerabilities: boolean
  // Advanced - Comments
  removeCommentedCode: boolean
  updateStaleComments: boolean
  removeObviousComments: boolean
  standardizeTodoFormat: boolean
  documentRemainingTodos: boolean
  // Advanced - Files
  removeEmptyFiles: boolean
  consolidateConfigs: boolean
  organizeImports: boolean
  removeBackupFiles: boolean
  standardizeNaming: boolean
}

const defaultFormData: CleanupData = {
  targetCode: '',
  cleanupGoals: '',
  cleanupTypes: '',
  codebaseAge: '',
  knownIssues: '',
  constraints: '',
  aggressiveness: 3,
  preserveComments: 3,
  testingRequired: 3,
  filesToIgnore: '',
  extraInfo: '',
  removeUnusedImports: true,
  removeUnusedVariables: true,
  removeUnusedFunctions: true,
  removeUnreachableCode: true,
  removeDeprecatedCode: false,
  consistentIndentation: true,
  lineEndings: '',
  trailingWhitespace: true,
  maxLineLength: '',
  bracesStyle: '',
  simplifyConditionals: true,
  extractMagicNumbers: false,
  removeNestedTernaries: true,
  flattenCallbacks: false,
  consolidateDuplicates: true,
  removeUnusedDeps: true,
  updateOutdatedDeps: false,
  consolidateSimilarDeps: false,
  removePeerDepWarnings: false,
  auditVulnerabilities: true,
  removeCommentedCode: true,
  updateStaleComments: false,
  removeObviousComments: false,
  standardizeTodoFormat: false,
  documentRemainingTodos: false,
  removeEmptyFiles: true,
  consolidateConfigs: false,
  organizeImports: true,
  removeBackupFiles: true,
  standardizeNaming: false,
}

export default function Cleanup() {
  const router = useRouter()
  const [formData, setFormData] = useState<CleanupData>(defaultFormData)
  const [xmlOutput, setXmlOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedSections, setAdvancedSections] = useState({
    deadCode: false,
    formatting: false,
    structure: false,
    dependencies: false,
    comments: false,
    files: false,
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

  const getAggressivenessLabel = (val: number) => {
    const labels = ['Conservative - obvious issues only', 'Light cleanup', 'Standard cleanup', 'Thorough cleanup', 'Aggressive - maximum cleanup']
    return labels[val - 1]
  }

  const getCommentsLabel = (val: number) => {
    const labels = ['Remove most comments', 'Remove stale comments', 'Keep useful comments', 'Preserve most comments', 'Preserve all comments']
    return labels[val - 1]
  }

  const getTestingLabel = (val: number) => {
    const labels = ['No testing needed', 'Manual spot check', 'Run existing tests', 'Full test coverage', 'Requires new tests for changes']
    return labels[val - 1]
  }

  const generateXML = () => {
    const xml = `<task_card type="cleanup">
  <meta_instruction>
    Follow this code cleanup workflow:
    0. INVENTORY: Survey the codebase for issues matching the cleanup goals.
    1. PRIORITIZE: Identify highest-impact cleanup opportunities.
    2. PLAN: Create a cleanup plan that won't break functionality.
    3. EXECUTE: Apply cleanups systematically, one category at a time.
    4. VERIFY: Ensure no regressions were introduced.
    5. DOCUMENT: Note any significant changes or remaining issues.
  </meta_instruction>

  <cleanup_details>
    <target_code>${formData.targetCode}</target_code>
    <cleanup_goals>${formData.cleanupGoals}</cleanup_goals>
    <cleanup_types>${formData.cleanupTypes}</cleanup_types>
    <codebase_age>${formData.codebaseAge || 'Not specified'}</codebase_age>
    <known_issues>${formData.knownIssues || 'None specified'}</known_issues>
    <constraints>${formData.constraints || 'None'}</constraints>
  </cleanup_details>

  <preferences>
    <aggressiveness level="${formData.aggressiveness}">${getAggressivenessLabel(formData.aggressiveness)}</aggressiveness>
    <preserve_comments level="${formData.preserveComments}">${getCommentsLabel(formData.preserveComments)}</preserve_comments>
    <testing_required level="${formData.testingRequired}">${getTestingLabel(formData.testingRequired)}</testing_required>
    <files_to_ignore>${formData.filesToIgnore || 'None'}</files_to_ignore>
    <extra_info>${formData.extraInfo || 'None'}</extra_info>
  </preferences>

  <advanced_config>
    <dead_code_removal>
      <remove_unused_imports>${formData.removeUnusedImports ? 'Yes' : 'No'}</remove_unused_imports>
      <remove_unused_variables>${formData.removeUnusedVariables ? 'Yes' : 'No'}</remove_unused_variables>
      <remove_unused_functions>${formData.removeUnusedFunctions ? 'Yes' : 'No'}</remove_unused_functions>
      <remove_unreachable_code>${formData.removeUnreachableCode ? 'Yes' : 'No'}</remove_unreachable_code>
      <remove_deprecated_code>${formData.removeDeprecatedCode ? 'Yes' : 'No'}</remove_deprecated_code>
    </dead_code_removal>
    <formatting>
      <consistent_indentation>${formData.consistentIndentation ? 'Yes' : 'No'}</consistent_indentation>
      <line_endings>${formData.lineEndings || 'LF (Unix)'}</line_endings>
      <trailing_whitespace>${formData.trailingWhitespace ? 'Remove' : 'Keep'}</trailing_whitespace>
      <max_line_length>${formData.maxLineLength || 'No limit'}</max_line_length>
      <braces_style>${formData.bracesStyle || 'Keep existing'}</braces_style>
    </formatting>
    <code_structure>
      <simplify_conditionals>${formData.simplifyConditionals ? 'Yes' : 'No'}</simplify_conditionals>
      <extract_magic_numbers>${formData.extractMagicNumbers ? 'Yes' : 'No'}</extract_magic_numbers>
      <remove_nested_ternaries>${formData.removeNestedTernaries ? 'Yes' : 'No'}</remove_nested_ternaries>
      <flatten_callbacks>${formData.flattenCallbacks ? 'Yes' : 'No'}</flatten_callbacks>
      <consolidate_duplicates>${formData.consolidateDuplicates ? 'Yes' : 'No'}</consolidate_duplicates>
    </code_structure>
    <dependencies>
      <remove_unused_deps>${formData.removeUnusedDeps ? 'Yes' : 'No'}</remove_unused_deps>
      <update_outdated_deps>${formData.updateOutdatedDeps ? 'Yes' : 'No'}</update_outdated_deps>
      <consolidate_similar_deps>${formData.consolidateSimilarDeps ? 'Yes' : 'No'}</consolidate_similar_deps>
      <remove_peer_dep_warnings>${formData.removePeerDepWarnings ? 'Yes' : 'No'}</remove_peer_dep_warnings>
      <audit_vulnerabilities>${formData.auditVulnerabilities ? 'Yes' : 'No'}</audit_vulnerabilities>
    </dependencies>
    <comments_cleanup>
      <remove_commented_code>${formData.removeCommentedCode ? 'Yes' : 'No'}</remove_commented_code>
      <update_stale_comments>${formData.updateStaleComments ? 'Yes' : 'No'}</update_stale_comments>
      <remove_obvious_comments>${formData.removeObviousComments ? 'Yes' : 'No'}</remove_obvious_comments>
      <standardize_todo_format>${formData.standardizeTodoFormat ? 'Yes' : 'No'}</standardize_todo_format>
      <document_remaining_todos>${formData.documentRemainingTodos ? 'Yes' : 'No'}</document_remaining_todos>
    </comments_cleanup>
    <file_organization>
      <remove_empty_files>${formData.removeEmptyFiles ? 'Yes' : 'No'}</remove_empty_files>
      <consolidate_configs>${formData.consolidateConfigs ? 'Yes' : 'No'}</consolidate_configs>
      <organize_imports>${formData.organizeImports ? 'Yes' : 'No'}</organize_imports>
      <remove_backup_files>${formData.removeBackupFiles ? 'Yes' : 'No'}</remove_backup_files>
      <standardize_naming>${formData.standardizeNaming ? 'Yes' : 'No'}</standardize_naming>
    </file_organization>
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

  const resetForm = () => {
    setFormData(defaultFormData)
    setXmlOutput('')
    setCopied(false)
  }

  return (
    <>
      <Head>
        <title>Cleanup - PunchCards</title>
      </Head>
      <main className="container">
        <button className="back-button" onClick={() => router.push('/')}>
          Back to Home
        </button>

        <div className="form-container">
          <div className="form-header">
            <h2 className="typewriter">CLEANUP TASK CARD</h2>
            <p className="typewriter-slow">
              Clean up and refactor your codebase
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generateXML() }}>
            {/* CORE DETAILS */}
            <div className="form-section">
              <h3>Core Details</h3>
              
              <div className="form-group">
                <label htmlFor="targetCode">Target Code / Files *</label>
                <textarea id="targetCode" name="targetCode" value={formData.targetCode} onChange={handleInputChange} placeholder="What code needs cleanup? List files, folders, or entire codebase..." required />
              </div>

              <div className="form-group">
                <label htmlFor="cleanupGoals">Cleanup Goals *</label>
                <textarea id="cleanupGoals" name="cleanupGoals" value={formData.cleanupGoals} onChange={handleInputChange} placeholder="What are you trying to achieve? e.g., reduce bundle size, improve readability, remove tech debt..." required />
              </div>

              <div className="form-group">
                <label htmlFor="cleanupTypes">Cleanup Types *</label>
                <textarea id="cleanupTypes" name="cleanupTypes" value={formData.cleanupTypes} onChange={handleInputChange} placeholder="e.g., dead code removal, formatting, dependency cleanup, refactoring..." required />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('deadCode')}>
                {advancedSections.deadCode ? '− ADVANCED DEAD CODE' : '+ ADVANCED DEAD CODE'}
              </button>

              {advancedSections.deadCode && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeUnusedImports" checked={formData.removeUnusedImports} onChange={handleCheckboxChange} />
                      <span>Remove unused imports</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeUnusedVariables" checked={formData.removeUnusedVariables} onChange={handleCheckboxChange} />
                      <span>Remove unused variables</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeUnusedFunctions" checked={formData.removeUnusedFunctions} onChange={handleCheckboxChange} />
                      <span>Remove unused functions/methods</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeUnreachableCode" checked={formData.removeUnreachableCode} onChange={handleCheckboxChange} />
                      <span>Remove unreachable code</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeDeprecatedCode" checked={formData.removeDeprecatedCode} onChange={handleCheckboxChange} />
                      <span>Remove deprecated code (may require migration)</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* CONTEXT */}
            <div className="form-section">
              <h3>Context</h3>

              <div className="form-group">
                <label htmlFor="codebaseAge">Codebase Age/History</label>
                <input type="text" id="codebaseAge" name="codebaseAge" value={formData.codebaseAge} onChange={handleInputChange} placeholder="e.g., 3 years old, legacy code, recently refactored..." />
              </div>

              <div className="form-group">
                <label htmlFor="knownIssues">Known Issues/Tech Debt</label>
                <textarea id="knownIssues" name="knownIssues" value={formData.knownIssues} onChange={handleInputChange} placeholder="Any known problem areas or accumulated tech debt..." />
              </div>

              <div className="form-group">
                <label htmlFor="constraints">Constraints/Limitations</label>
                <textarea id="constraints" name="constraints" value={formData.constraints} onChange={handleInputChange} placeholder="Any constraints? e.g., can't change public API, keep backward compat..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('formatting')}>
                {advancedSections.formatting ? '− ADVANCED FORMATTING' : '+ ADVANCED FORMATTING'}
              </button>

              {advancedSections.formatting && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="consistentIndentation" checked={formData.consistentIndentation} onChange={handleCheckboxChange} />
                      <span>Ensure consistent indentation</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lineEndings">Line Endings</label>
                    <input type="text" id="lineEndings" name="lineEndings" value={formData.lineEndings} onChange={handleInputChange} placeholder="e.g., LF, CRLF, keep existing..." />
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="trailingWhitespace" checked={formData.trailingWhitespace} onChange={handleCheckboxChange} />
                      <span>Remove trailing whitespace</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxLineLength">Max Line Length</label>
                    <input type="text" id="maxLineLength" name="maxLineLength" value={formData.maxLineLength} onChange={handleInputChange} placeholder="e.g., 80, 100, 120, no limit..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bracesStyle">Braces Style</label>
                    <input type="text" id="bracesStyle" name="bracesStyle" value={formData.bracesStyle} onChange={handleInputChange} placeholder="e.g., K&R, Allman, keep existing..." />
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('structure')}>
                {advancedSections.structure ? '− ADVANCED STRUCTURE' : '+ ADVANCED STRUCTURE'}
              </button>

              {advancedSections.structure && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="simplifyConditionals" checked={formData.simplifyConditionals} onChange={handleCheckboxChange} />
                      <span>Simplify complex conditionals</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="extractMagicNumbers" checked={formData.extractMagicNumbers} onChange={handleCheckboxChange} />
                      <span>Extract magic numbers to constants</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeNestedTernaries" checked={formData.removeNestedTernaries} onChange={handleCheckboxChange} />
                      <span>Remove nested ternary operators</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="flattenCallbacks" checked={formData.flattenCallbacks} onChange={handleCheckboxChange} />
                      <span>Flatten callback hell to async/await</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="consolidateDuplicates" checked={formData.consolidateDuplicates} onChange={handleCheckboxChange} />
                      <span>Consolidate duplicate code</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* PREFERENCES */}
            <div className="form-section">
              <h3>Preferences</h3>

              <div className="form-group">
                <label>Cleanup Aggressiveness</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.aggressiveness === val ? 'active' : ''}`} onClick={() => handleRatingChange('aggressiveness', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getAggressivenessLabel(formData.aggressiveness)}</span>
              </div>

              <div className="form-group">
                <label>Comment Preservation</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.preserveComments === val ? 'active' : ''}`} onClick={() => handleRatingChange('preserveComments', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getCommentsLabel(formData.preserveComments)}</span>
              </div>

              <div className="form-group">
                <label>Testing Required</label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} type="button" className={`rating-btn ${formData.testingRequired === val ? 'active' : ''}`} onClick={() => handleRatingChange('testingRequired', val)}>{val}</button>
                  ))}
                </div>
                <span className="rating-label">{getTestingLabel(formData.testingRequired)}</span>
              </div>

              <div className="form-group">
                <label htmlFor="filesToIgnore">Files/Folders to Ignore</label>
                <textarea id="filesToIgnore" name="filesToIgnore" value={formData.filesToIgnore} onChange={handleInputChange} placeholder="Files that should not be touched..." />
              </div>

              <div className="form-group">
                <label htmlFor="extraInfo">Extra Info / Notes</label>
                <textarea id="extraInfo" name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Any additional cleanup requirements or notes..." />
              </div>

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('dependencies')}>
                {advancedSections.dependencies ? '− ADVANCED DEPENDENCIES' : '+ ADVANCED DEPENDENCIES'}
              </button>

              {advancedSections.dependencies && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeUnusedDeps" checked={formData.removeUnusedDeps} onChange={handleCheckboxChange} />
                      <span>Remove unused dependencies</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="updateOutdatedDeps" checked={formData.updateOutdatedDeps} onChange={handleCheckboxChange} />
                      <span>Update outdated dependencies</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="consolidateSimilarDeps" checked={formData.consolidateSimilarDeps} onChange={handleCheckboxChange} />
                      <span>Consolidate similar dependencies</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removePeerDepWarnings" checked={formData.removePeerDepWarnings} onChange={handleCheckboxChange} />
                      <span>Resolve peer dependency warnings</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="auditVulnerabilities" checked={formData.auditVulnerabilities} onChange={handleCheckboxChange} />
                      <span>Audit and fix vulnerabilities</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('comments')}>
                {advancedSections.comments ? '− ADVANCED COMMENTS' : '+ ADVANCED COMMENTS'}
              </button>

              {advancedSections.comments && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeCommentedCode" checked={formData.removeCommentedCode} onChange={handleCheckboxChange} />
                      <span>Remove commented-out code</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="updateStaleComments" checked={formData.updateStaleComments} onChange={handleCheckboxChange} />
                      <span>Update stale/incorrect comments</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeObviousComments" checked={formData.removeObviousComments} onChange={handleCheckboxChange} />
                      <span>Remove obvious/redundant comments</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="standardizeTodoFormat" checked={formData.standardizeTodoFormat} onChange={handleCheckboxChange} />
                      <span>Standardize TODO/FIXME format</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="documentRemainingTodos" checked={formData.documentRemainingTodos} onChange={handleCheckboxChange} />
                      <span>Document remaining TODOs</span>
                    </label>
                  </div>
                </div>
              )}

              <button type="button" className="advanced-toggle" onClick={() => toggleAdvanced('files')}>
                {advancedSections.files ? '− ADVANCED FILE ORG' : '+ ADVANCED FILE ORG'}
              </button>

              {advancedSections.files && (
                <div className="advanced-section">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeEmptyFiles" checked={formData.removeEmptyFiles} onChange={handleCheckboxChange} />
                      <span>Remove empty files</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="consolidateConfigs" checked={formData.consolidateConfigs} onChange={handleCheckboxChange} />
                      <span>Consolidate config files</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="organizeImports" checked={formData.organizeImports} onChange={handleCheckboxChange} />
                      <span>Organize and sort imports</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="removeBackupFiles" checked={formData.removeBackupFiles} onChange={handleCheckboxChange} />
                      <span>Remove backup/temp files</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="standardizeNaming" checked={formData.standardizeNaming} onChange={handleCheckboxChange} />
                      <span>Standardize file naming conventions</span>
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
            <>
              <div className="xml-output">
                <button className={`copy-button ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                  {copied ? 'COPIED' : 'COPY XML'}
                </button>
                {xmlOutput}
              </div>
              {copied && <div className="success-message">XML copied to clipboard! Paste it into your AI assistant.</div>}
            </>
          )}
        </div>
      </main>
    </>
  )
}
