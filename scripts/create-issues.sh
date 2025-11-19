#!/bin/bash

echo "📦 Generating issues.json for FairShare…"

cat > issues.json << 'EOF'
[
  {
    "title": "EPIC: Project Setup & Infrastructure",
    "body": "Set up foundational project structure for FairShare.",
    "labels": ["epic"]
  },
  {
    "title": "Initialize Next.js project",
    "body": "Create new Next.js app with TypeScript, App Router, strict mode, and basic folders.",
    "labels": ["setup", "frontend"]
  },
  {
    "title": "Install TailwindCSS",
    "body": "Install TailwindCSS and configure theme, global styles, typography.",
    "labels": ["setup", "frontend"]
  },
  {
    "title": "Add shadcn/ui",
    "body": "Install shadcn/ui components (Button, Card, Input, Dialog, Toast).",
    "labels": ["setup", "frontend"]
  },

  {
    "title": "EPIC: Data Layer & Local Persistence",
    "body": "Implement TypeScript models, localStorage service, helpers.",
    "labels": ["epic"]
  },
  {
    "title": "Create TypeScript models",
    "body": "Define User, Group, Expense interfaces.",
    "labels": ["data", "frontend"]
  },
  {
    "title": "LocalStorage service",
    "body": "Create abstraction layer for reading/writing Groups and User.",
    "labels": ["data", "frontend"]
  },
  {
    "title": "Balance calculation helpers",
    "body": "Implement calculateBalances(), addExpense(), settleDebt().",
    "labels": ["logic", "frontend"]
  },

  {
    "title": "EPIC: Authentication",
    "body": "Local-only authentication. Store user in localStorage.",
    "labels": ["epic"]
  },
  {
    "title": "Login UI",
    "body": "Simple login form with email/password.",
    "labels": ["auth", "frontend"]
  },
  {
    "title": "Create AuthContext",
    "body": "Holds user state, login(), logout(), and persistent session.",
    "labels": ["auth", "frontend"]
  },
  {
    "title": "Protect routes",
    "body": "Redirect non-authenticated users to login.",
    "labels": ["auth", "frontend"]
  },

  {
    "title": "EPIC: Dashboard",
    "body": "Lists groups and shows balance summary.",
    "labels": ["epic"]
  },
  {
    "title": "Dashboard layout",
    "body": "Group list, balance summary.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Create Group modal",
    "body": "Form to create a group and add members.",
    "labels": ["ui", "frontend"]
  },

  {
    "title": "EPIC: Group Details",
    "body": "Displays members, balances, expenses.",
    "labels": ["epic"]
  },
  {
    "title": "Group details page",
    "body": "Header, balances, expense list.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Balance display",
    "body": "Show 'You owe X' vs 'X owes you' with colors.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Expense list",
    "body": "Sorted by date; description, amount, payer, borrowed/lent.",
    "labels": ["ui", "frontend"]
  },

  {
    "title": "EPIC: Add Expense Flow",
    "body": "Form + logic to add expenses.",
    "labels": ["epic"]
  },
  {
    "title": "Add Expense form",
    "body": "Inputs for description, amount, payer, and splitBetween.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Add Expense validation",
    "body": "Amount > 0, payer chosen, at least one member.",
    "labels": ["validation", "frontend"]
  },
  {
    "title": "Save new expense",
    "body": "Push to group, recalc balances, save to localStorage.",
    "labels": ["data", "frontend"]
  },

  {
    "title": "EPIC: Pay Up Flow",
    "body": "Record debt settlement between members.",
    "labels": ["epic"]
  },
  {
    "title": "Pay Up page",
    "body": "Shows list of debts owed by the user.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Pay confirmation modal",
    "body": "Confirm payment and update balances.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Settle debt logic",
    "body": "Implement settleDebt() to zero out balances.",
    "labels": ["logic", "frontend"]
  },

  {
    "title": "EPIC: UX Polish & Deployment",
    "body": "Loading states, responsiveness, Vercel deployment.",
    "labels": ["epic"]
  },
  {
    "title": "Loading and empty states",
    "body": "Skeleton loaders + empty dashboard, group, and expenses.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Responsive styles",
    "body": "Ensure layout works on mobile.",
    "labels": ["ui", "frontend"]
  },
  {
    "title": "Deploy to Vercel",
    "body": "Connect repo to Vercel and deploy.",
    "labels": ["devops"]
  }
]
EOF

echo "✅ issues.json generated."

echo "📡 Creating GitHub issues…"

if ! command -v gh &> /dev/null
then
    echo "❌ ERROR: GitHub CLI (gh) is not installed."
    echo "Install it with: brew install gh"
    exit 1
fi

# Read each issue and create it
jq -c '.[]' issues.json | while read issue; do
  title=$(echo "$issue" | jq -r '.title')
  body=$(echo "$issue" | jq -r '.body')
  labels=$(echo "$issue" | jq -r '.labels | join(",")')

  echo "➕ Creating issue: $title"

  gh issue create \
    --title "$title" \
    --body "$body" \
    --label "$labels" \
    >/dev/null
done

echo "🎉 All issues created successfully!"