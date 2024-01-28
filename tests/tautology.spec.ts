describe('Tautology', (): void => {
  it('This test must always be true', async (): Promise<void> => {
    expect(true).toBe(true)
    expect(false).not.toBe(true)
    expect(true).not.toBe(false)
    expect(false).toBe(false)
  })
})
