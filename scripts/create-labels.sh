#!/bin/bash

echo "🎨 Creating GitHub labels…"

# Label: epic
gh label create epic \
  --color FF0080 \
  --description "High-level feature grouping" || echo "epic already exists"

# Label: setup
gh label create setup \
  --color 5319E7 \
  --description "Project setup tasks" || echo "setup already exists"

# Label: frontend
gh label create frontend \
  --color 1F6FEB \
  --description "Frontend implementation work" || echo "frontend already exists"

# Label: data
gh label create data \
  --color 0E8A16 \
  --description "Data modeling and persistence tasks" || echo "data already exists"

# Label: logic
gh label create logic \
  --color FBCA04 \
  --description "Business logic and utilities" || echo "logic already exists"

# Label: auth
gh label create auth \
  --color D93F0B \
  --description "Authentication tasks" || echo "auth already exists"

# Label: ui
gh label create ui \
  --color C5DEF5 \
  --description "User interface and UX tasks" || echo "ui already exists"

# Label: validation
gh label create validation \
  --color E99695 \
  --description "Form validation and rules" || echo "validation already exists"

# Label: devops
gh label create devops \
  --color 5319E7 \
  --description "Deployment and project configuration" || echo "devops already exists"

echo "✅ All labels created (or already existed)."