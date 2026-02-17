#!/usr/bin/env node
// Validates MDX frontmatter against the blog content collection schema.
// Usage:
//   node scripts/validate-frontmatter.mjs                   # validate all blog posts
//   node scripts/validate-frontmatter.mjs file1.mdx file2.mdx  # validate specific files

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { argv, exit } from 'node:process';

const VALID_CATEGORIES = [
  'noticias',
  'historia',
  'turismo',
  'productos',
  'cultura',
  'gastronomia',
  'opinion',
];

const RULES = {
  title: { required: true, maxLen: 70 },
  description: { required: true, maxLen: 160 },
  author: { required: false }, // has default in schema
  date: { required: true },
  category: { required: true, oneOf: VALID_CATEGORIES },
  coverImage: { required: true },
  coverImageAlt: { required: true },
  tags: { required: false, isArray: true }, // has default [] in schema
};

// ---------------------------------------------------------------------------
// Minimal YAML-subset parser (handles the frontmatter patterns in this repo)
// ---------------------------------------------------------------------------
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const yaml = match[1];
  const data = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of yaml.split('\n')) {
    // Array continuation:  "  - value"
    const arrayItem = line.match(/^\s+-\s+(.*)/);
    if (arrayItem && currentKey && currentArray !== null) {
      currentArray.push(stripQuotes(arrayItem[1].trim()));
      data[currentKey] = currentArray;
      continue;
    }

    // Top-level key: value
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)/);
    if (kv) {
      const key = kv[1];
      const rawVal = kv[2].trim();

      if (rawVal === '' || rawVal === '[]') {
        // Could be start of an array block or empty value
        currentKey = key;
        currentArray = [];
        data[key] = rawVal === '[]' ? [] : '';
        continue;
      }

      // Inline array: [a, b, c]
      const inlineArr = rawVal.match(/^\[(.*)\]$/);
      if (inlineArr) {
        data[key] = inlineArr[1]
          .split(',')
          .map((s) => stripQuotes(s.trim()))
          .filter(Boolean);
        currentKey = key;
        currentArray = null;
        continue;
      }

      data[key] = stripQuotes(rawVal);
      currentKey = key;
      currentArray = null;
      continue;
    }

    // Nested object lines (e.g. inside faq) — skip, we don't validate faq deeply
  }

  return data;
}

function stripQuotes(s) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
function validateFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const data = parseFrontmatter(content);
  const errors = [];
  const rel = relative(process.cwd(), filePath);

  if (!data) {
    errors.push(`${rel}: No frontmatter found`);
    return errors;
  }

  for (const [field, rule] of Object.entries(RULES)) {
    const val = data[field];

    if (rule.required && (val === undefined || val === '')) {
      errors.push(`${rel}: "${field}" is required`);
      continue;
    }

    if (val === undefined || val === '') continue;

    if (rule.maxLen && typeof val === 'string' && val.length > rule.maxLen) {
      errors.push(
        `${rel}: "${field}" is ${val.length} chars (max ${rule.maxLen})`
      );
    }

    if (rule.oneOf && !rule.oneOf.includes(val)) {
      errors.push(
        `${rel}: "${field}" must be one of [${rule.oneOf.join(', ')}], got "${val}"`
      );
    }

    if (rule.isArray && !Array.isArray(val)) {
      errors.push(`${rel}: "${field}" must be an array`);
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// File collection
// ---------------------------------------------------------------------------
function collectMdxFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...collectMdxFiles(full));
    } else if (entry.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const args = argv.slice(2);
const files =
  args.length > 0
    ? args
    : collectMdxFiles(join(process.cwd(), 'src/content/blog'));

let allErrors = [];
for (const file of files) {
  allErrors.push(...validateFile(file));
}

if (allErrors.length > 0) {
  console.error('\n❌ Frontmatter validation failed:\n');
  for (const err of allErrors) {
    console.error(`  • ${err}`);
  }
  console.error('');
  exit(1);
} else {
  console.log(`✅ Frontmatter OK (${files.length} file${files.length === 1 ? '' : 's'})`);
}
