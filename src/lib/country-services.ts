// Country data and services

// Get country name from country code
export function getCountryName(countryCode: string): string {
  const countries: Record<string, string> = {
    MX: "Mexico",
    ES: "Spain",
    CO: "Colombia",
    AR: "Argentina",
    UY: "Uruguay",
    CL: "Chile",
    PE: "Peru",
    SV: "El Salvador",
    BR: "Brazil",
    NG: "Nigeria",
    KE: "Kenya",
    GH: "Ghana",
    ZA: "South Africa",
  }

  return countries[countryCode] || "Unknown Country"
}

// Get currency by country code
export function getCurrencyByCountry(countryCode: string): string {
  const currencies: Record<string, string> = {
    MX: "MXN",
    ES: "EUR",
    CO: "COP",
    AR: "ARS",
    UY: "UYU",
    CL: "CLP",
    PE: "PEN",
    SV: "USD",
    BR: "BRL",
    NG: "NGN",
    KE: "KES",
    GH: "GHS",
    ZA: "ZAR",
  }

  return currencies[countryCode] || "USD"
}

// Update the getProvidersByCountryAndCategory function to include all the service providers for each country

export function getProvidersByCountryAndCategory(countryCode: string, category: string): string[] {
  const providers: Record<string, Record<string, string[]>> = {
    MX: {
      "mobile-data": ["Telcel", "AT&T", "Movistar"],
      "mobile-plan": ["Telcel", "Unefon", "Virgin Mobile"],
      electricity: ["CFE"],
      "tv-phone-internet": ["Telmex", "Totalplay", "Izzi", "Megacable"],
      gas: ["Gas Natural Fenosa", "Zeta Gas", "Gas Express Nieto"],
      water: ["SACMEX", "SIAPA", "CESPT"],
      transportation: ["Televía", "PASE", "TAG IAVE"],
      memberships: ["Smart Fit", "Costco"],
      "credit-card": ["BBVA", "Citibanamex", "Santander"],
      taxes: ["SAT", "Gobierno CDMX", "Edo. México"],
      mortgage: ["INFONAVIT", "FOVISSSTE", "BBVA"],
    },
    ES: {
      "mobile-data": ["Movistar", "Orange", "Vodafone"],
      "mobile-plan": ["Yoigo", "Pepephone", "Simyo"],
      electricity: ["Endesa", "Iberdrola", "Naturgy"],
      "tv-phone-internet": ["Movistar+", "Orange TV", "Vodafone TV"],
      gas: ["Naturgy", "Repsol", "Endesa"],
      water: ["Canal Isabel II", "Aqualia", "EMASA"],
      transportation: ["Renfe", "EMT Madrid", "TMB Barcelona"],
      memberships: ["El Corte Inglés", "Gympass", "FNAC"],
      "credit-card": ["BBVA", "Santander", "CaixaBank"],
      taxes: ["Agencia Tributaria"],
      mortgage: ["BBVA", "CaixaBank"],
    },
    CO: {
      "mobile-data": ["Claro", "Movistar", "Tigo"],
      "mobile-plan": ["Virgin Mobile", "WOM", "ETB"],
      electricity: ["Codensa", "EPM", "Celsia"],
      "tv-phone-internet": ["Claro", "Movistar", "Tigo"],
      gas: ["Vanti", "Alcanos"],
      water: ["Acueducto Bogotá", "EPM", "EMCALI"],
      transportation: ["TransMilenio", "Metro de Medellín"],
      memberships: ["Tupperware", "Natura"],
      "credit-card": ["Bancolombia", "Davivienda", "BBVA"],
      taxes: ["DIAN"],
      mortgage: ["Banco de Bogotá", "Bancolombia"],
    },
    AR: {
      "mobile-data": ["Personal", "Movistar", "Claro"],
      "mobile-plan": ["Tuenti", "Movistar"],
      electricity: ["Edenor", "Edesur", "Edelap"],
      "tv-phone-internet": ["Telecom", "Telecentro", "DirecTV"],
      gas: ["Metrogas", "Naturgy"],
      water: ["AySA"],
      transportation: ["SUBE"],
      memberships: ["Avon", "Natura", "Amway"],
      "credit-card": ["Banco Galicia", "BBVA"],
      taxes: ["AFIP", "ARBA"],
      mortgage: ["Banco Nación", "Banco Ciudad"],
    },
    UY: {
      "mobile-data": ["Antel", "Movistar", "Claro"],
      "mobile-plan": ["Antel", "Dedicado"],
      electricity: ["UTE"],
      "tv-phone-internet": ["TCC", "Montecable", "DirecTV"],
      gas: ["MontevideoGas", "Conecta"],
      water: ["OSE"],
      transportation: ["STM Montevideo"],
      memberships: ["Avon", "Herbalife"],
      "credit-card": ["BBVA", "Santander"],
      taxes: ["DGI Uruguay"],
      mortgage: ["BROU", "Banco Hipotecario"],
    },
    CL: {
      "mobile-data": ["Entel", "Movistar", "WOM"],
      "mobile-plan": ["Claro", "VTR", "Virgin"],
      electricity: ["Enel", "CGE"],
      "tv-phone-internet": ["VTR", "Movistar", "Entel"],
      gas: ["Lipigas", "Abastible", "Gasco"],
      water: ["Aguas Andinas", "Essbio"],
      transportation: ["Red Metropolitana", "Metro Santiago"],
      memberships: ["Natura", "Tupperware"],
      "credit-card": ["Banco de Chile", "Santander"],
      taxes: ["SII"],
      mortgage: ["Banco Estado", "Scotiabank"],
    },
    PE: {
      "mobile-data": ["Movistar", "Claro", "Entel"],
      "mobile-plan": ["Bitel", "Virgin"],
      electricity: ["Enel", "Luz del Sur"],
      "tv-phone-internet": ["Movistar", "Claro"],
      gas: ["Cálidda"],
      water: ["SEDAPAL"],
      transportation: ["Metropolitano", "Lima Metro"],
      memberships: ["Avon", "Herbalife"],
      "credit-card": ["BCP", "Interbank"],
      taxes: ["SUNAT"],
      mortgage: ["Mivivienda", "Scotiabank"],
    },
    SV: {
      "mobile-data": ["Tigo", "Claro", "Movistar"],
      "mobile-plan": ["Digicel"],
      electricity: ["CAESS", "AES"],
      "tv-phone-internet": ["Claro TV", "Tigo", "Sky"],
      gas: ["Tropigas", "Zeta Gas"],
      water: ["ANDA"],
      transportation: ["SITRAMSS", "VMT"],
      memberships: ["Avon", "Natura"],
      "credit-card": ["Banco Agrícola", "Davivienda"],
      taxes: ["Ministerio de Hacienda"],
      mortgage: ["FSV"],
    },
    BR: {
      "mobile-data": ["Vivo", "Claro", "TIM"],
      "mobile-plan": ["Oi", "Algar"],
      electricity: ["Enel", "Cemig", "Copel"],
      "tv-phone-internet": ["Claro NET", "Oi", "SKY"],
      gas: ["Comgás", "CEG"],
      water: ["Sabesp", "Copasa"],
      transportation: ["Bilhete Único", "BRT"],
      memberships: ["Natura", "Jequiti"],
      "credit-card": ["Nubank", "Itaú", "Bradesco"],
      taxes: ["Receita Federal"],
      mortgage: ["Caixa Econômica"],
    },
    NG: {
      "mobile-data": ["MTN Nigeria", "Airtel Nigeria", "Glo Mobile", "9mobile"],
      "mobile-plan": ["MTN Nigeria", "Airtel Nigeria", "Glo Mobile", "9mobile"],
      electricity: [
        "Eko Electricity Distribution Plc",
        "Ikeja Electric",
        "Abuja Electricity Distribution Company",
        "Port Harcourt Electricity Distribution Company",
        "Enugu Electricity Distribution Company",
      ],
      "tv-phone-internet": ["DSTV (Multichoice)", "GOtv", "StarTimes", "TSTV"],
      gas: ["Nigeria LNG", "Axxela Limited", "Shell Nigeria Gas", "Nigerian Gas Company Limited"],
      water: ["Lagos State Water Corporation", "Abuja Water Board", "Enugu State Water Corporation"],
      transportation: ["Lagos Bus Rapid Transit (BRT)", "Abuja Light Rail", "GIGM", "ABC Transport"],
      memberships: ["Avon", "Oriflame", "GNLD", "Forever Living"],
      "credit-card": ["Zenith Bank", "GTBank", "Access Bank", "First Bank of Nigeria"],
      taxes: ["Federal Inland Revenue Service (FIRS)", "Lagos State Internal Revenue Service (LIRS)"],
      mortgage: ["Federal Mortgage Bank of Nigeria", "Abbey Mortgage Bank", "Infinity Trust Mortgage Bank"],
    },
    KE: {
      "mobile-data": ["Safaricom", "Airtel Kenya", "Telkom Kenya"],
      "mobile-plan": ["Safaricom", "Airtel Kenya", "Telkom Kenya"],
      electricity: ["Kenya Power and Lighting Company (KPLC)"],
      "tv-phone-internet": ["DSTV (Multichoice)", "Zuku", "StarTimes", "GOtv"],
      gas: ["Rubis Energy Kenya", "TotalEnergies Kenya", "Vivo Energy Kenya"],
      water: [
        "Nairobi City Water and Sewerage Company",
        "Mombasa Water Supply and Sanitation Company",
        "Kisumu Water and Sanitation Company",
      ],
      transportation: ["Kenya Railways", "Nairobi Matatu Sacco", "Easy Coach"],
      memberships: ["Avon", "Oriflame", "GNLD", "Forever Living"],
      "credit-card": ["KCB Bank Kenya", "Equity Bank", "Standard Chartered Kenya", "Co-operative Bank of Kenya"],
      taxes: ["Kenya Revenue Authority (KRA)"],
      mortgage: ["Kenya Mortgage Refinance Company (KMRC)", "Housing Finance Company of Kenya", "KCB Bank Kenya"],
    },
    GH: {
      "mobile-data": ["MTN Ghana", "Vodafone Ghana", "AirtelTigo"],
      "mobile-plan": ["MTN Ghana", "Vodafone Ghana", "AirtelTigo"],
      electricity: ["Electricity Company of Ghana (ECG)", "Northern Electricity Distribution Company (NEDCo)"],
      "tv-phone-internet": ["DSTV (Multichoice)", "GOtv", "StarTimes", "Vodafone Ghana"],
      gas: ["Ghana National Gas Company", "GOIL LPG", "Blue Ocean Investments"],
      water: ["Ghana Water Company Limited (GWCL)"],
      transportation: ["Metro Mass Transit", "VIP Jeoun Transport", "STC Ghana"],
      memberships: ["Avon", "Oriflame", "GNLD", "Forever Living"],
      "credit-card": ["GCB Bank", "Ecobank Ghana", "Standard Chartered Ghana", "Fidelity Bank Ghana"],
      taxes: ["Ghana Revenue Authority (GRA)"],
      mortgage: ["Ghana Home Loans", "Republic Bank Ghana", "Stanbic Bank Ghana"],
    },
    ZA: {
      "mobile-data": ["Vodacom", "MTN", "Telkom", "Cell C"],
      "mobile-plan": ["Vodacom", "MTN", "Telkom", "Cell C"],
      electricity: ["Eskom", "City Power", "Cape Town Electricity"],
      "tv-phone-internet": ["DSTV", "Openview", "StarSat", "Telkom"],
      gas: ["Sasol", "Egoli Gas", "Easigas"],
      water: ["Johannesburg Water", "eThekwini", "Cape Town Water"],
      transportation: ["Gautrain", "MyCiTi", "Golden Arrow", "PRASA"],
      memberships: ["Avon", "Oriflame", "GNLD", "Forever Living"],
      "credit-card": ["Standard Bank", "Absa", "Nedbank", "FNB"],
      taxes: ["SARS"],
      mortgage: ["Standard Bank", "Absa", "Nedbank", "FNB"],
    },
  }

  // Default to empty array if country or category not found
  return providers[countryCode]?.[category] || ["Provider 1", "Provider 2", "Provider 3"]
}

// Get services by country
export function getServicesByCountry(countryCode: string) {
  // Default services for all countries
  const defaultServices = [
    {
      id: "mobile-data",
      name: "Mobile Data",
      providers: "",
      icon: "smartphone",
    },
    {
      id: "mobile-plan",
      name: "Mobile Plan",
      providers: "",
      icon: "phone",
    },
    {
      id: "electricity",
      name: "Electricity",
      providers: "",
      icon: "zap",
    },
    {
      id: "tv-phone-internet",
      name: "TV / Internet / Phone",
      providers: "",
      icon: "tv",
    },
    {
      id: "gas",
      name: "Gas",
      providers: "",
      icon: "flame",
    },
    {
      id: "water",
      name: "Water",
      providers: "",
      icon: "droplet",
    },
    {
      id: "transportation",
      name: "Transportation",
      providers: "",
      icon: "car",
    },
    {
      id: "memberships",
      name: "Memberships",
      providers: "",
      icon: "credit-card",
    },
    {
      id: "credit-card",
      name: "Credit Card",
      providers: "",
      icon: "credit-card",
    },
    {
      id: "taxes",
      name: "Taxes",
      providers: "",
      icon: "landmark",
    },
    {
      id: "mortgage",
      name: "Mortgage",
      providers: "",
      icon: "home",
    },
    {
      id: "insurance",
      name: "Insurance",
      providers: "",
      icon: "shield",
    },
    {
      id: "car-loan",
      name: "Car Loan",
      providers: "",
      icon: "car",
    },
  ]

  // Return services with country-specific providers
  return defaultServices.map((service) => {
    const countryProviders = getProvidersByCountryAndCategory(countryCode, service.id)
    return {
      ...service,
      providers: countryProviders.join(", "),
    }
  })
}
