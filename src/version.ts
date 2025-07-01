
/** Regular expression used to parse semantic version strings */
const versionPattern = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z\.]+))?/;

/**
 * Simple semantic version parser and comparator.
 */
export class SemVersion {
  major: number;
  minor: number;
  patch: number;
  meta: string;

  /**
   * Parses a version string and populates the instance fields.
   */
  constructor(version: string) {
    const match = versionPattern.exec(version);
    if (match) {
      this.major = Number(match[1]);
      this.minor = Number(match[2] || 0);
      this.patch = Number(match[3] || 0);
      this.meta = match[4];
    }
  }

  /**
   * Returns `true` if this version is greater than or equal to the provided one.
   */
  isGtOrEq(version: string): boolean {
    const compared = new SemVersion(version);
    return !(this.major < compared.major || this.minor < compared.minor || this.patch < compared.patch);
  }

  /**
   * Returns `true` if the version string could be parsed successfully.
   */
  isValid(): boolean {
    return typeof this.major === 'number' && !isNaN(this.major);
  }
}

/**
 * Helper function to compare two version strings using semantic versioning.
 */
export function isVersionGtOrEq(a: string, b: string): boolean {
  const aSemver = new SemVersion(a);
  return aSemver.isGtOrEq(b);
}
