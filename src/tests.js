import { describe, it, expect } from 'vitest'
import { formatWithPercentage } from './your-module-name' // Update with actual import path

describe('formatWithPercentage', () => {
  it('should format valid numbers as percentages', () => {
    expect(formatWithPercentage(0.5)).toBe('50%')
    expect(formatWithPercentage(0.25)).toBe('25%')
    expect(formatWithPercentage(1)).toBe('100%')
    expect(formatWithPercentage(0)).toBe('0%')
    expect(formatWithPercentage(1.5)).toBe('150%')
  })

  it('should handle decimal numbers correctly', () => {
    expect(formatWithPercentage(0.123)).toBe('12.3%')
    expect(formatWithPercentage(0.6789)).toBe('67.89%')
    expect(formatWithPercentage(0.001)).toBe('0.1%')
  })

  it('should handle negative numbers', () => {
    expect(formatWithPercentage(-0.5)).toBe('-50%')
    expect(formatWithPercentage(-1)).toBe('-100%')
    expect(formatWithPercentage(-0.123)).toBe('-12.3%')
  })

  it('should return empty string for null', () => {
    expect(formatWithPercentage(null)).toBe('')
  })

  it('should return empty string for undefined', () => {
    expect(formatWithPercentage(undefined)).toBe('')
  })

  it('should handle edge cases', () => {
    expect(formatWithPercentage(0.0001)).toBe('0.01%')
    expect(formatWithPercentage(0.999)).toBe('99.9%')
    expect(formatWithPercentage(10)).toBe('1000%')
  })

  it('should handle very small numbers', () => {
    expect(formatWithPercentage(0.000001)).toBe('0.0001%')
    expect(formatWithPercentage(0.00001)).toBe('0.001%')
  })

  it('should handle very large numbers', () => {
    expect(formatWithPercentage(100)).toBe('10000%')
    expect(formatWithPercentage(1000)).toBe('100000%')
  })

  // Test type coercion edge cases
  it('should handle numeric strings (if applicable)', () => {
    // Note: The current implementation only checks for strict null/undefined
    // These tests assume the function would handle numeric strings
    // You may need to adjust based on your actual requirements
    expect(formatWithPercentage('0.5')).toBe('50%')
    expect(formatWithPercentage('1')).toBe('100%')
  })

  it('should handle zero variations', () => {
    expect(formatWithPercentage(0)).toBe('0%')
    expect(formatWithPercentage(-0)).toBe('0%')
    expect(formatWithPercentage(0.0)).toBe('0%')
  })
})
