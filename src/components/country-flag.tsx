interface CountryFlagProps {
  countryCode: string
}

export function CountryFlag({ countryCode }: CountryFlagProps) {
  // Convert country code to regional indicator symbols for flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return <div className="w-8 h-8 flex items-center justify-center text-lg">{getFlagEmoji(countryCode)}</div>
}
