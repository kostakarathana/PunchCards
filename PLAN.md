# Punchcards

## Overview

This will be a simple react website that serves the purpose of allowing users to enter instructional information in various ways, then all of the information is compiled into a single XML folder to be used by an agentic coder like copilot or cursor etc. The point is that the user provides all instructional information and context, then its all moved into one space (the XML)

## Flow

### Page #1

Card options for:

- Bug Fix
- Feature Request
- Feature Change

```xml
<task_card type="bug_fix">
    <meta_instruction>
        DO NOT fix the code immediately. Follow this strict process:
        0. CONTEXT STUDY: Deeply analyze the provided codebase. Identify the files involved in the error, trace the execution flow, and understand the expected state vs actual state.
        1. ANALYZE: Read the provided stack trace/behavior in relation to your codebase study.
        2. REPRODUCE: Write a standalone reproduction script or test case that fails.
        3. CONFIRM: Wait for me to run the script and confirm the failure.
        4. FIX: Apply the fix to the codebase.
        5. VERIFY: Run the reproduction script again to prove it passes.
    </meta_instruction>

    <bug_details>
        <observed_behavior>
            </observed_behavior>
        <expected_behavior>
            </expected_behavior>
        <steps_to_reproduce>
            </steps_to_reproduce>
    </bug_details>
</task_card>
```

```xml
<task_card type="feature_request">
  <meta_instruction>
    Adopt a "Skeleton-of-Thought" approach:
    0. CONTEXT STUDY: Review the existing project structure, design patterns, and utility libraries. Ensure new additions align with established coding conventions.
    1. ARCHITECTURE: Summarize the files you need to create or modify based on your study.
    2. CONTRACTS: Write the Interfaces, Types, or DB Schemas FIRST.
    3. STOP: Ask for my approval on the interfaces before writing logic.
    4. IMPLEMENT: Once approved, write the implementation logic.
  </meta_instruction>

  <feature_details>
    <goal>
      </goal>
    <user_story>
      </user_story>
    <constraints>
      </constraints>
    <reference_files>
      </reference_files>
  </feature_details>
</task_card>
```

```xml
<task_card type="feature_change">
  <meta_instruction>
    Perform a "Safe Refactor" workflow:
    0. CONTEXT STUDY: Map out the dependency graph for the target functionality. Identify all upstream callers and downstream dependencies.
    1. IMPACT ANALYSIS: List all files and functions that rely on the code I want to change.
    2. PLAN: Explain how you will handle backward compatibility or data migration.
    3. EXECUTE: Apply the changes.
    4. TEST: Suggest specific regression tests to ensure old features still work.
  </meta_instruction>

  <change_details>
    <target_functionality>
      </target_functionality>
    <desired_change>
      </desired_change>
    <reasoning>
      </reasoning>
  </change_details>
</task_card>
```


## Process 
The website asks them for the information that those XML files need, then it generates and allows you to copy the XML file. 