// src/constants/stakeholders.js

export const stakeholdersData = [
  {
    id: 'payers',
    type: 'payers',
    title: 'Health Insurance Providers',
    problem: 'Most HMOs in Nigeria face high Medical Loss Ratios (MLRs) of 100-140%, resulting in financial losses and unsustainable business models.',
    benefits: [
      'Reduce Medical Loss Ratios from over 140% to sustainable levels',
      'Prevent fraud, abuse, and unnecessary use of services',
      'Accurately verify eligibility, benefits, and treatments',
      'Get valuable data insights to control costs and improve premium pricing',
      'Reduce administrative expenses while improving accuracy',
      'Process claims faster and with higher accuracy'
    ]
  },
  {
    id: 'providers',
    type: 'providers',
    title: 'Healthcare Providers',
    problem: 'Healthcare providers struggle with claim denials, revenue leakage, and difficulties verifying patient coverage before delivering services.',
    benefits: [
      'Keep expenses within fixed capitation payment amounts',
      'Prevent denial of payment by payers through accurate verification',
      'Reduce administrative costs with automated processes',
      'Get real-time patient eligibility verification before providing services',
      'Track utilization patterns to optimize resource allocation',
      'Improve revenue cycle management'
    ]
  },
  {
    id: 'patients',
    type: 'patients',
    title: 'Patients & Enrollees',
    problem: 'Patients often face long wait times, care denials, and unexpected out-of-pocket expenses due to inefficient verification processes.',
    benefits: [
      'Experience dramatically reduced waiting times from hours to seconds',
      'Eliminate unexpected out-of-pocket payments and billing surprises',
      'Reduce denials of care through instant coverage verification',
      'Access benefits information quickly and easily',
      'Experience a smoother, more seamless care process',
      'Better understand coverage limits and terms before treatment'
    ]
  }
];