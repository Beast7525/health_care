import { MedicalRecord, TimelineEvent, WellnessGuidance, DoctorQuestion, RecordQAMessage } from '../types';

export const INITIAL_RECORDS: MedicalRecord[] = [
  {
    id: 'rec-001',
    title: 'Comprehensive Metabolic & Lipid Panel',
    category: 'Lab Results',
    date: '2026-08-14',
    facility: 'Apex Diagnostics & Lab Center',
    doctorName: 'Dr. Sarah Jenkins, MD',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    rawText: `PATIENT RECORD - LAB RESULTS
Date: 14-Aug-2026
Facility: Apex Diagnostics
Patient: Alex Morgan (DOB: 12-May-1988)

TEST RESULTS:
Serum Glucose: 98 mg/dL (Normal Range: 70-99 mg/dL)
25-Hydroxy Vitamin D: 21.4 ng/mL [LOW] (Normal Range: 30.0 - 100.0 ng/mL)
Serum Triglycerides: 142 mg/dL (Normal Range: <150 mg/dL)
LDL Cholesterol: 118 mg/dL (Normal Range: <100 mg/dL)
Total Cholesterol: 195 mg/dL (Normal Range: <200 mg/dL)
High Sensitivity C-Reactive Protein (hs-CRP): 1.1 mg/L (Normal Range: <1.0 mg/L)

IMPRESSION: Mild 25-OH Vitamin D deficiency noted. Serum lipid profile borderline elevated LDL. Non-specific mild elevation in inflammatory marker hs-CRP. Recommend dietary review, sun exposure, and follow-up consultation with PCP.`,
    simplifiedSummary: 'Your blood work shows overall good metabolic function, but your Vitamin D level (21.4 ng/mL) is slightly below the recommended healthy target of 30 ng/mL. Your LDL cholesterol is borderline elevated, and there is a very mild indicator of general tissue inflammation (hs-CRP) which often correlates with recent exercise, stress, or mild muscle soreness.',
    decodedTerms: [
      {
        term: '25-Hydroxy Vitamin D',
        definition: 'The primary circulating form of Vitamin D in the blood, essential for bone strength, muscle recovery, and immune function.',
        category: 'Lab Metric'
      },
      {
        term: 'hs-CRP (C-Reactive Protein)',
        definition: 'A protein produced by the liver that rises when there is general inflammation in the body. Mild spikes can happen from strenuous workouts, joint strain, or minor infections.',
        category: 'Inflammatory Marker'
      },
      {
        term: 'LDL Cholesterol',
        definition: 'Often referred to as "low-density lipoprotein". Lower levels support long-term cardiovascular health.',
        category: 'Lipid Metric'
      }
    ],
    labValues: [
      { testName: '25-Hydroxy Vitamin D', value: '21.4', unit: 'ng/mL', referenceRange: '30.0 - 100.0', status: 'low' },
      { testName: 'Serum Glucose', value: '98', unit: 'mg/dL', referenceRange: '70 - 99', status: 'normal' },
      { testName: 'LDL Cholesterol', value: '118', unit: 'mg/dL', referenceRange: '< 100', status: 'high' },
      { testName: 'hs-CRP', value: '1.1', unit: 'mg/L', referenceRange: '< 1.0', status: 'high' }
    ]
  },
  {
    id: 'rec-002',
    title: 'Right Knee MRI Scan & Radiologist Report',
    category: 'Imaging',
    date: '2026-07-28',
    facility: 'Metro Orthopedic Imaging Center',
    doctorName: 'Dr. Robert Vance, MD (Radiology)',
    fileSize: '4.2 MB',
    fileType: 'pdf',
    rawText: `MRI RIGHT KNEE WITHOUT CONTRAST
Date: 28-Jul-2026
Clinical Indication: Persistent right knee discomfort following downhill hiking 3 weeks ago.

FINDINGS:
1. Medial Meniscus: Grade 1 signal abnormality within the posterior horn without overt articular surface tear.
2. Anterior Cruciate Ligament (ACL) & Posterior Cruciate Ligament (PCL): Intact with normal signal intensity.
3. Patellofemoral Joint: Mild patellar tendinopathy at the inferior pole. Small joint effusion noted.
4. Bone Marrow: No focal bone marrow edema or fracture detected.

IMPRESSION: Grade I medial meniscus strain/micro-irritation and mild patellar tendinopathy. No complete tear identified. Conservative management with physical therapy and activity modification suggested.`,
    simplifiedSummary: 'Your MRI scan showed no broken bones or severe ligament tears. The radiologist identified minor strain/wear in the cushion of your inner knee joint (Grade 1 medial meniscus signal) and mild tendon irritation right below the kneecap (patellar tendinopathy). Small fluid buildup (effusion) is present, which explains stiffness after long walks.',
    decodedTerms: [
      {
        term: 'Grade 1 Signal Abnormality',
        definition: 'Minor tissue strain or internal fluid change inside the cartilage cushion. It does NOT mean the cartilage is torn through.',
        category: 'Imaging Findings'
      },
      {
        term: 'Patellar Tendinopathy',
        definition: 'Irritation or soreness in the tendon that connects your kneecap to your shinbone, commonly triggered by repetitive jumping, running, or downhill walking.',
        category: 'Condition Term'
      },
      {
        term: 'Joint Effusion',
        definition: 'An accumulation of extra fluid inside the joint capsule, often referred to as "water on the knee" when swelling occurs.',
        category: 'Anatomical Term'
      }
    ]
  },
  {
    id: 'rec-003',
    title: 'Physical Therapy Assessment & Discharge Plan',
    category: 'Clinical Notes',
    date: '2026-06-10',
    facility: 'Movement First Rehabilitation',
    doctorName: 'Elena Rostova, DPT',
    fileSize: '1.2 MB',
    fileType: 'pdf',
    rawText: `CLINICAL REHABILITATION SUMMARY
Patient: Alex Morgan
Evaluation Date: 10-Jun-2026

SUBJECTIVE: Patient reports intermittent lower extremity stiffness after prolonged desk sitting (>4 hours) and mild hamstring tightness.

PHYSICAL EXAMINATION:
- Lumbar Range of Motion: Full, pain-free.
- Quadriceps Strength: 5/5 bilateral.
- Gluteus Medius Activation: Slightly delayed on right side.
- Hamstring Flexibility: Moderate tightness bilaterally (Popliteal angle 160 deg).

PLAN & GUIDANCE:
1. Ergonomic adjustments: Stand up every 45 minutes.
2. Quadriceps and hip abduction strengthening exercises (3x weekly).
3. Active hamstring stretches prior to physical activity.`,
    simplifiedSummary: 'Your physical therapist noted that your lower body stiffness is largely linked to sitting at a desk for long stretches. Muscle strength in your legs is strong, but your right hip stabilizer muscles (gluteus medius) wake up a bit slowly, putting extra stress on your knee and thigh muscles during walks.',
    decodedTerms: [
      {
        term: 'Gluteus Medius Activation',
        definition: 'How effectively the side hip muscle engages during walking to keep the pelvis steady and prevent knee caving.',
        category: 'Biomechanics'
      },
      {
        term: 'Bilateral Tightness',
        definition: 'Flexibility restriction present on both the right and left sides of the body.',
        category: 'Clinical Term'
      }
    ]
  }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'evt-1',
    date: '2026-08-14',
    title: 'Blood Panel & Vitamin D Assessment',
    category: 'Lab Test',
    description: 'Routine blood checkup at Apex Diagnostics. Mild Vitamin D deficiency (21.4 ng/mL) flagged.',
    keyFindings: ['Vitamin D level low at 21.4 ng/mL', 'Glucose normal at 98 mg/dL', 'Borderline elevated LDL cholesterol'],
    recordId: 'rec-001',
    recordTitle: 'Comprehensive Metabolic & Lipid Panel',
    statusTag: 'Monitored'
  },
  {
    id: 'evt-2',
    date: '2026-08-02',
    title: 'Noticed Leg & Knee Discomfort',
    category: 'Symptom',
    description: 'Sensation of tightness and dull ache along right lower leg and knee after a weekend mountain hike.',
    keyFindings: ['Stiffness after sitting for over 1 hour', 'Mild swelling around inner knee joint'],
    statusTag: 'Stable'
  },
  {
    id: 'evt-3',
    date: '2026-07-28',
    title: 'Right Knee Diagnostic MRI',
    category: 'Imaging',
    description: 'Non-contrast MRI of right knee confirming Grade 1 meniscus irritation and mild patellar tendon strain.',
    keyFindings: ['No ACL or structural cartilage tear', 'Small joint fluid accumulation (effusion)', 'Physical therapy suggested'],
    recordId: 'rec-002',
    recordTitle: 'Right Knee MRI Scan & Radiologist Report',
    statusTag: 'Resolved'
  },
  {
    id: 'evt-4',
    date: '2026-06-10',
    title: 'Physical Therapy Ergonomic Consultation',
    category: 'Consultation',
    description: 'Discharge consultation with Physical Therapist Elena Rostova regarding sitting posture and hip activation exercises.',
    keyFindings: ['Prescribed quadriceps and glute strengthening', 'Advised 45-minute desk break routine'],
    recordId: 'rec-003',
    recordTitle: 'Physical Therapy Assessment & Discharge Plan',
    statusTag: 'Follow-up Needed'
  }
];

export const INITIAL_GUIDANCE: WellnessGuidance[] = [
  {
    id: 'guide-1',
    category: 'Ergonomics & Activity',
    title: 'Desk Break & Quad Activation Routine',
    description: 'Based on your physical therapy assessment and lower body stiffness notes, break up long sitting intervals every 45 minutes.',
    actionableTips: [
      'Set a gentle 45-minute timer during work sessions to stand and stretch.',
      'Perform 10 standing bodyweight glute squeezes and calf raises.',
      'Avoid crossing your legs while seated to maintain equal hip alignment.'
    ],
    relevanceReason: 'Directly addresses seated leg tightness logged in your June PT assessment.'
  },
  {
    id: 'guide-2',
    category: 'Hydration & Nutrition',
    title: 'Vitamin D & Joint Support Nutrition',
    description: 'Your August blood panel indicated a low Vitamin D level (21.4 ng/mL). Incorporate Vitamin D-rich whole foods into your meal routine.',
    actionableTips: [
      'Include fatty fish (salmon, trout), eggs, and Vitamin D fortified plant milks.',
      'Aim for 15-20 minutes of morning sunlight on arms/legs when UV index is safe.',
      'Discuss Vitamin D supplementation options with your healthcare provider.'
    ],
    relevanceReason: 'Aligned with low Vitamin D flagged in Apex Diagnostics lab report.'
  },
  {
    id: 'guide-3',
    category: 'Physical Recovery',
    title: 'Low-Impact Knee Mobility & Ice Protocol',
    description: 'Your July MRI confirmed mild patellar tendon irritation without cartilage tears. Focus on gentle, non-pounding leg movements.',
    actionableTips: [
      'Choose low-impact activities like swimming or smooth stationary cycling over downhill running.',
      'Apply a cold compress wrapped in a towel for 15 minutes after long walking sessions if swelling occurs.',
      'Perform gentle straight-leg raises while lying on your back to build knee stability.'
    ],
    relevanceReason: 'Tailored to Grade 1 meniscus strain findings on your July MRI.'
  },
  {
    id: 'guide-4',
    category: 'Sleep & Rest',
    title: 'Optimized Sleep Positioning For Joint Comfort',
    description: 'Ensure your lower back and knees remain neutral overnight to promote cellular recovery and minimize morning tightness.',
    actionableTips: [
      'Place a thin pillow between your knees if sleeping on your side to keep pelvis aligned.',
      'Place a small pillow under your knees if sleeping on your back.',
      'Maintain a cool room temperature (65-68°F) to support deep restful REM sleep cycles.'
    ],
    relevanceReason: 'Supports muscle tissue recovery following physical strain.'
  }
];

export const INITIAL_DOCTOR_QUESTIONS: DoctorQuestion[] = [
  {
    id: 'dq-1',
    category: 'Lab Understanding',
    questionText: 'My recent blood work showed Vitamin D at 21.4 ng/mL. What daily OTC supplement dosage or dietary changes do you recommend for my baseline?',
    reason: 'Flagged low Vitamin D in August 2026 Lab Panel.'
  },
  {
    id: 'dq-2',
    category: 'Symptom Progression',
    questionText: 'My July MRI indicated Grade 1 meniscus signal abnormality. Is it safe for me to resume moderate incline hiking, or should I stay on flat ground?',
    reason: 'Follow-up on MRI findings from Metro Orthopedic Imaging.'
  },
  {
    id: 'dq-3',
    category: 'Recovery Plan',
    questionText: 'Are there specific physical therapy exercises I should prioritize to strengthen my right gluteus medius and prevent knee overload?',
    reason: 'Based on PT assessment of delayed hip muscle activation.'
  },
  {
    id: 'dq-4',
    category: 'Lab Understanding',
    questionText: 'My hs-CRP was slightly elevated (1.1 mg/L). Could this be related to my knee tendon irritation or workout soreness, or should we recheck it later?',
    reason: 'Flagged mild hs-CRP elevation in recent blood panel.'
  }
];

export const INITIAL_QA_MESSAGES: RecordQAMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hello! I am your HealthLens AI Document Assistant. You can ask me any question about your uploaded medical records, such as lab metrics, radiologist findings, or clinical notes.',
    timestamp: 'Just now'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'What did my latest blood test report say about my Vitamin D levels?',
    timestamp: '1 min ago'
  },
  {
    id: 'msg-3',
    sender: 'ai',
    text: 'According to your **Comprehensive Metabolic & Lipid Panel** dated August 14, 2026, your 25-Hydroxy Vitamin D level was recorded at **21.4 ng/mL**.\n\nThe standard reference range is 30.0 to 100.0 ng/mL, meaning your result was flagged as slightly low. The lab impression suggested dietary adjustments, sun exposure, and consulting your doctor regarding supplementation.',
    timestamp: '1 min ago',
    citations: [
      {
        recordId: 'rec-001',
        recordTitle: 'Comprehensive Metabolic & Lipid Panel',
        snippet: '25-Hydroxy Vitamin D: 21.4 ng/mL [LOW] (Normal Range: 30.0 - 100.0 ng/mL). IMPRESSION: Mild 25-OH Vitamin D deficiency noted.',
        date: '2026-08-14'
      }
    ],
    warningNote: 'Note: Always consult your physician before starting high-dose Vitamin D or altering supplement routines.'
  }
];
