export interface VisaDetail {
  id: string;
  name: string;
  shortDesc: string;
  highlights: string[];
  timeline: string;
  requiredDocuments: { id: string; title: string; desc: string; explanation: string; commonMistakes: string; }[];
  commonMistakes: string[];
  afterArrival: string;
  aimaExplanation: string;
}

export const VISA_DATA: Record<string, VisaDetail> = {
  Study: {
    id: 'D4',
    name: 'D4 Study Visa',
    shortDesc: 'For international students enrolled in Portuguese institutions.',
    highlights: [
      'Initial visa validity: 4 months (2 entries)',
      'Requires AIMA appointment after arrival',
      'Residence permit issued after biometrics',
      'Usually valid for 1–2 years, renewable'
    ],
    timeline: 'Processing usually takes 30-90 days depending on the embassy.',
    requiredDocuments: [
      { 
        id: 'passport', 
        title: 'Valid International Passport', 
        desc: '6+ months validity', 
        explanation: 'Your passport must be valid for at least 6 months and have at least 2 blank pages.',
        commonMistakes: 'Passport expiring too soon or not enough blank pages.'
      },
      { 
        id: 'admission', 
        title: 'Admission Letter', 
        desc: 'From an accredited school', 
        explanation: 'Official acceptance document from a Portuguese higher education institution.',
        commonMistakes: 'Using a conditional admission letter without fulfilling conditions.'
      },
      { 
        id: 'criminal', 
        title: 'Criminal Record', 
        desc: 'Apostilled/Legalized', 
        explanation: 'Must be from your country of origin or where you lived for more than a year. Nigeria: Police Character Certificate/Police Clearance.',
        commonMistakes: 'Missing apostille or certificate older than three months.'
      },
      { 
        id: 'legalized_docs', 
        title: 'Legalized Certificate Documents', 
        desc: 'WAEC, Degree, Transcripts', 
        explanation: 'Academic certificates usually require legalization/authentication. Nigeria: MFA authentication in Abuja is required.',
        commonMistakes: 'Certificates not authenticated by the Ministry of Foreign Affairs.'
      },
      { 
        id: 'funds', 
        title: 'Proof of Funds', 
        desc: 'Sufficient balance', 
        explanation: 'Show approximately €11,000+ in accessible funds for tuition and living expenses.',
        commonMistakes: 'Statements showing insufficient balance or erratic deposits.'
      },
      { 
        id: 'insurance', 
        title: 'Health Insurance', 
        desc: 'Schengen-compliant', 
        explanation: 'Minimum coverage of €30,000 for medical emergencies.',
        commonMistakes: 'Insurance that doesn\'t cover the entire Schengen area.'
      },
      { 
        id: 'accommodation', 
        title: 'Accommodation Proof', 
        desc: 'Rental or dorm proof', 
        explanation: 'Lease agreement, invitation letter, or university dorm confirmation.',
        commonMistakes: 'Providing a hotel booking for only a few days.'
      },
      { 
        id: 'flight', 
        title: 'Flight Reservation', 
        desc: 'Round trip or one way', 
        explanation: 'A confirmed flight reservation showing your intent to travel.',
        commonMistakes: 'Booking a flight before visa confirmation (reservations are preferred).'
      }
    ],
    commonMistakes: [
      'Missing apostille on criminal record',
      'Weak proof of funds',
      'Incorrect insurance coverage',
      'Accommodation mismatch'
    ],
    afterArrival: 'You must apply for a residence permit at AIMA (formerly SEF) within your first 4 months.',
    aimaExplanation: 'AIMA is the agency responsible for immigration. You\'ll need an appointment for biometrics to get your physical residence card.'
  },
  Work: {
    id: 'D1/D3',
    name: 'D1/D3 Employment Visa',
    shortDesc: 'For professionals with a job offer or highly qualified activities.',
    highlights: [
      'Initial visa validity: 4 months (2 entries)',
      'D1 for general employment, D3 for highly qualified work',
      'Enables long-term residency and family reunification',
      'Requires social security (NISS) registration'
    ],
    timeline: 'Processing can take 60-120 days. Employment contracts must be verified.',
    requiredDocuments: [
      { 
        id: 'contract', 
        title: 'Work Contract', 
        desc: 'Signed by both parties', 
        explanation: 'Valid employment contract or promise of contract from a Portuguese company.',
        commonMistakes: 'Missing IEFP certification or signatures.'
      },
      { 
        id: 'qualifications', 
        title: 'Qualifications', 
        desc: 'Diplomas/Certificates', 
        explanation: 'Evidence of professional qualifications relevant to the position.',
        commonMistakes: 'Unlegalized degrees or irrelevant certificates.'
      },
      { 
        id: 'criminal', 
        title: 'Criminal Record', 
        desc: 'Apostilled/Legalized', 
        explanation: 'Must be from your home country and apostilled.',
        commonMistakes: 'Expired record or missing apostille.'
      },
      { 
        id: 'accommodation', 
        title: 'Accommodation Proof', 
        desc: 'Rental agreement', 
        explanation: 'Proof of where you will live in Portugal.',
        commonMistakes: 'Temporary airbnb bookings are often rejected for D1.'
      }
    ],
    commonMistakes: [
      'Contract missing mandatory clauses',
      'Incomplete professional background evidence',
      'Lack of salary matching the required threshold',
      'Missing tax declarations'
    ],
    afterArrival: 'Apply for NISS (Social Security) and your residence permit at AIMA.',
    aimaExplanation: 'You will need to present your validated contract and proof of insurance for the residence permit.'
  },
  Relocation: {
    id: 'DN/D7',
    name: 'Digital Nomad / D7 Visa',
    shortDesc: 'For remote workers, freelancers, or those with passive income.',
    highlights: [
      'D7 for passive income (pensions, rentals)',
      'Digital Nomad for remote employees/freelancers',
      'Allows living in Portugal while working globally',
      'Path to permanent residency after 5 years'
    ],
    timeline: 'Average processing: 60-90 days. Proof of remote work or income is key.',
    requiredDocuments: [
      { 
        id: 'remote_proof', 
        title: 'Proof of Income', 
        desc: 'Remote work contract', 
        explanation: 'For Digital Nomads, proof of remote employment or freelancing income.',
        commonMistakes: 'Income falling below the 4x minimum wage threshold.'
      },
      { 
        id: 'passive_income', 
        title: 'Passive Income', 
        desc: 'Pension/Rental docs', 
        explanation: 'For D7, proof of stable recurring income from outside Portugal.',
        commonMistakes: 'Relying on savings instead of recurring income.'
      },
      { 
        id: 'bank_pt', 
        title: 'PT Bank Account', 
        desc: 'With required balance', 
        explanation: 'Highly recommended to show a Portuguese bank account with 12 months of savings.',
        commonMistakes: 'Insufficient funds deposited in the Portuguese account.'
      }
    ],
    commonMistakes: [
      'Income not reaching the minimum threshold',
      'Vague remote work proof',
      'Missing Portuguese bank account setup',
      'Inadequate tax residency proof'
    ],
    afterArrival: 'Register for NIF (Tax Number) and AIMA residence permit.',
    aimaExplanation: 'You must prove your remote work status is still valid and show your local address registration (Atestado de Residência).'
  },
  Family: {
    id: 'Family',
    name: 'Family Reunification',
    shortDesc: 'For family members of residents or citizens living in Portugal.',
    highlights: [
      'Join your spouse, partner, or parents',
      'Depends on the main applicant\'s residence status',
      'Grants right to work and study in Portugal',
      'Usually processed alongside the main applicant'
    ],
    timeline: 'Can take 90-180 days. Often depends on the main applicant\'s permit status.',
    requiredDocuments: [
      { 
        id: 'civil_docs', 
        title: 'Civil Documents', 
        desc: 'Marriage/Birth certificates', 
        explanation: 'Original certificates proving family relationships, must be apostilled.',
        commonMistakes: 'Certificates not legalized by the local MFA/Embassy.'
      },
      { 
        id: 'dependency', 
        title: 'Dependency Proof', 
        desc: 'Economic dependence', 
        explanation: 'For children over 18 or parents, proof of being economically dependent.',
        commonMistakes: 'Insufficient proof of financial reliance.'
      },
      { 
        id: 'main_applicant', 
        title: 'Main Applicant Permit', 
        desc: 'Copy of residence card', 
        explanation: 'Copy of the residence permit of the family member in Portugal.',
        commonMistakes: 'Main applicant\'s permit expiring during the process.'
      }
    ],
    commonMistakes: [
      'Non-apostilled relationship certificates',
      'Inconsistent names across documents',
      'Failure to prove shared household',
      'Expired passports'
    ],
    afterArrival: 'Immediate application for residence at AIMA as a family member.',
    aimaExplanation: 'You will need to attend an AIMA interview together with the main applicant in most cases.'
  }
};
