// src/constants/risks.js

export const risksData = [
  {
    id: 1,
    risk: "Low technology adoption among healthcare providers, especially in rural areas.",
    riskImpact: "Could limit platform penetration and effectiveness in areas where it's needed most.",
    mitigation: "Developed offline-first approach that works on basic smartphones with simple, WhatsApp-like interface requiring minimal training.",
    mitigationStrategy: "Progressive implementation starting with urban centers and gradually expanding to rural areas with targeted training programs."
  },
  {
    id: 2,
    risk: "Data security concerns and potential breaches compromising patient information.",
    riskImpact: "Loss of trust and potential regulatory penalties, particularly under Nigeria's Data Protection Regulation.",
    mitigation: "End-to-end encryption of all patient data with secure offline storage and compliance with NDPR standards.",
    mitigationStrategy: "Regular security audits and penetration testing conducted by third-party cybersecurity firms."
  },
  {
    id: 3,
    risk: "Resistance from healthcare workers who fear automation may threaten their jobs.",
    riskImpact: "Slow adoption and potential sabotage of implementation efforts.",
    mitigation: "Positioning solution as an assistant rather than replacement, automating administrative tasks while allowing health workers to focus on patient care.",
    mitigationStrategy: "Early stakeholder engagement and clear communication about how the platform reduces workload rather than replacing jobs."
  },
  {
    id: 4,
    risk: "Infrastructure challenges including unreliable electricity and internet connectivity.",
    riskImpact: "System downtime affecting service delivery and user experience.",
    mitigation: "Lightweight application designed to operate on minimal power with offline capability and data synchronization when connectivity returns.",
    mitigationStrategy: "Partnership with local telecom providers for special data packages and investment in solar-powered backup systems for key facilities."
  },
  {
    id: 5,
    risk: "Regulatory hurdles and slow approval processes from Nigeria's healthcare authorities.",
    riskImpact: "Delayed market entry and limited ability to scale quickly.",
    mitigation: "Early engagement with NHIS, Ministry of Health, and other regulatory bodies as part of development process.",
    mitigationStrategy: "Modular approach allowing for implementation of pre-approved features while awaiting full regulatory clearance."
  },
  {
    id: 6,
    risk: "Algorithm bias in healthcare decisions due to limited or unrepresentative training data.",
    riskImpact: "Potential for unequal healthcare outcomes across different demographic groups.",
    mitigation: "Extensive model training on diverse Nigerian patient data with continuous model improvement based on real-world usage.",
    mitigationStrategy: "Regular bias audits and human oversight for algorithmic decisions with transparent explanation of recommendations."
  },
  {
    id: 7,
    risk: "Difficulty in integrating with legacy healthcare management systems used by hospitals and HMOs.",
    riskImpact: "Fragmented digital experience requiring manual data entry between systems.",
    mitigation: "Development of flexible API connectors and data migration tools for major existing systems in the Nigerian market.",
    mitigationStrategy: "Phased integration approach with dedicated technical support for initial setup and customization."
  },
  {
    id: 8,
    risk: "Economic instability and currency fluctuations affecting pricing model sustainability.",
    riskImpact: "Unpredictable revenue streams and difficulty maintaining affordable pricing.",
    mitigation: "Multi-tiered subscription model with options for different facility sizes and usage levels.",
    mitigationStrategy: "Value-based pricing tied to documented cost savings and ROI for healthcare providers and HMOs."
  }
];