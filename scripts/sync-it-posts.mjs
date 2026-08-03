/**
 * CLI: sync missing Italian posts from WordPress.
 * Usage:
 *   node scripts/sync-it-posts.mjs
 *   node scripts/sync-it-posts.mjs --dry-run
 *   node scripts/sync-it-posts.mjs --force
 */
import { syncMissingItalianPosts } from "../lib/i18n/sync-it-posts.mjs";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");

const result = await syncMissingItalianPosts({ dryRun, force, log: true });
if (result.created.length) {
  console.log("Created:", result.created.join(", "));
}
process.exit(0);
