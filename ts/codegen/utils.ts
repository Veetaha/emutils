/**
 * Return `expr` parenthesized if it is not a simple identifier or numeric literal.
 * @param expr Expression to be parenthesized.
 */
export function par(expr: string | number): string {
    return /^[a-z_$0-9.]+$/i.test(String(expr)) ? `${expr}` : `(${expr})`;
}

/**
 * Return the string that represents TypeScript binary expression code.
 * `lhs` (left hand side) and `rhs` (right hand side) get parenthesized if neccessary.
 *
 * @param lhs Left hand side of the expression
 * @param op Binary operator
 * @param rhs Right hand side of the expression
 */
export function binary(lhs: string | number, op: string, rhs: string | number): string {
    lhs = String(lhs);
    rhs = String(rhs);

    if (op === "*") {
        if (lhs === "1") return rhs;
        if (rhs === "1") return lhs;
        if (rhs === "0" || lhs === "0") return "0";
    }
    if (op === "**") {
        if (lhs === "1" || rhs === "0") return "1";
    }
    if (op === "/") {
        if (rhs === "1") return lhs;
    }
    if (op === "%") {
        if (rhs === "1") return "0";
    }
    if (op === "+" || op === "-") {
        if (lhs === "0") return rhs;
        if (rhs === "0") return lhs;
    }
    // TODO: more simplifications

    return `${par(lhs)} ${op} ${par(rhs)}`;
}

/**
 * Shortahnd for enclosing `str` with backticks.
 * @param str String to ecnlose with backticks.
 */
export function bt(str: string) {
    return `${'`'}${str}${'`'}`;
}

export function maybePlural(count: number) {
    return count === 1 ? '' : 's';
}

/**
 * Shrinks multiple subsequent whitespace characters to one single whitespace char,
 * adds leading whitespace to string if it is not empty.
 * Returns empty string if `str` contains nothing but whitespace characters.
 * @param str String to shrink whitespaces in.
 */
export function shrinkWs(str = '') {
    const result = str.replace(/ +/g, ' ').trim();
    return result === '' ? '' : ` ${result}`;
}
